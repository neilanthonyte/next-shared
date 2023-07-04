import { inject, injectable } from "inversify";
import moment from "moment";
import debugFactory from "debug";

import { IOptionService } from "./OptionService";
import { createGuid } from "../helpers/guid";
import { currentUnixTimestamp } from "../helpers/currentUnixTimestamp";
import { delay } from "../util/delay";
import { traceLogging } from "../util/traceLogging";

const debug = debugFactory("next:CronService");

export interface ICronJob {
  name: string;
  funcToRun: () => void;
  frequencyInMinutes?: number;
  atTimeOfDay?: {
    hour: number;
    minute: number;
  };
}

// metadata stored about past job executions (stored in options)
export interface IJobExecutionData {
  name: string;
  lastExecution: number;
  currentExecution?: {
    executionId: string;
    instanceId: string;
    lockedAt: number;
  };
}

export interface ICronService {
  start(): void;

  registerJob(job: ICronJob): void;
}

@traceLogging("CronService")
@injectable()
export class CronService implements ICronService {
  constructor(
    @inject("OptionService") private _optionsService: IOptionService,
  ) {}

  // how often to check due jobs (in ms)
  public checkJobsInterval = 1000 * 60;
  public jobExecutionTimeout = 120; // in seconds - if a job has been running for more than 2 min, start again

  protected jobs: ICronJob[] = [];
  protected instanceId = createGuid();

  /* istanbul ignore next */
  public start() {
    debug(`Cron service starting, instanceId: '${this.instanceId}'`);

    // check at a random time between 30-60 seconds between jobs
    // this ensures that a single instance doesnt do all the work

    const enqueueJobCheck = () => {
      const queuedTimeSeconds = 30 + Math.floor(Math.random() * 30);

      debug("Enqueuing job check to run in %o seconds", queuedTimeSeconds);
      setTimeout(() => {
        this.runDueJobs().catch(console.error);
        enqueueJobCheck();
      }, queuedTimeSeconds * 1000);
    };

    this.runDueJobs().catch(console.error);
    enqueueJobCheck();
  }

  public registerJob(job: ICronJob) {
    // validate job name
    if (job.name.length < 3) {
      throw new Error("Job name must be at least 3 characters long");
    }

    if (job.name.length >= 100) {
      throw new Error("Job name must less than 100 characters");
    }

    if (job.frequencyInMinutes && job.atTimeOfDay) {
      throw new Error(
        "Job cannot contain both a frequencyInMinutes and atTimeOfDay",
      );
    }

    if (!job.frequencyInMinutes && !job.atTimeOfDay) {
      throw new Error(
        "Job must contain either frequencyInMinutes or atTimeOfDay",
      );
    }

    // check that job is not already registered
    if (this.jobs.filter((x) => x.name === job.name).length > 0) {
      throw new Error(`Job '${job.name}' already registered`);
    }

    if (job.frequencyInMinutes) {
      debug(
        `Job '${job.name}': Registered to run every ${job.frequencyInMinutes} seconds`,
      );
    }

    if (job.atTimeOfDay) {
      debug(
        `Job '${job.name}': Registered to run every day at ${job.atTimeOfDay.hour}:${job.atTimeOfDay.minute}`,
      );
    }

    this.jobs.push(job);
  }

  // internal functions
  public async runDueJobs() {
    return Promise.all(this.jobs.map((job) => this.runJobIfDue(job)));
  }

  private async runJobIfDue(job: ICronJob) {
    const jobExecutionData = await this.getJobExecutionData(job);

    // no existing job data, job has never run before
    if (
      jobExecutionData.lastExecution === null &&
      jobExecutionData.currentExecution === null
    ) {
      debug(
        `Job '${job.name}': has never run before, running for the first time`,
      );
      return this.tryRunJob(job);
    }

    // frequencyInMinutes abort
    if (
      job.frequencyInMinutes &&
      secondsSince(jobExecutionData.lastExecution) < job.frequencyInMinutes * 60
    ) {
      // it has not been more than 'job.frequencyInMinutes' since this job last ran
      return;
    }

    // atTimeOfDay abort
    if (job.atTimeOfDay) {
      const lastExecution = moment.unix(jobExecutionData.lastExecution);
      const todaysExecution = moment()
        .set("hour", job.atTimeOfDay.hour)
        .set("minute", job.atTimeOfDay.minute);

      // has already run today
      if (lastExecution.isSame(moment(), "day")) {
        return;
      }

      // not time to run it yet today
      if (moment().isBefore(todaysExecution)) {
        return;
      }
    }

    if (jobExecutionData.currentExecution) {
      // ensure current execution is valid
      if (
        secondsSince(jobExecutionData.currentExecution.lockedAt) >
        this.jobExecutionTimeout
      ) {
        // current execution has timed out, try running again
        debug(
          `Job '${job.name}' has a currentExecution but has timed out, trying to execute again`,
        );
        return this.tryRunJob(job);
      }

      debug(`Job '${job.name}' already has a currentExecution -
                not running again (another worker is probably running this task)`);

      return;
    }

    // it has been frequencyInMinutes since the job last ran and there is no lock on the job
    return this.tryRunJob(job);
  }

  private async tryRunJob(job: ICronJob) {
    // make sure we only hold the execution lock for minimum time
    // this is to allow us to assume that a lock that has been on for a while is corrupt
    const jobExecutionId = createGuid();
    debug(
      `Job: '${job.name}': Trying to run, executionId: '${jobExecutionId}'`,
    );

    const jobExecutionData = await this.getJobExecutionData(job);

    jobExecutionData.currentExecution = {
      instanceId: this.instanceId,
      executionId: jobExecutionId,
      lockedAt: currentUnixTimestamp(),
    };

    debug(`Job '${job.name}': Attempting to acquire lock`);
    // store lock
    await this.setJobExecutionData(job, jobExecutionData);

    // wait and ensure that the lock remains ours
    // this is in case tryRunJob has been called simultaneously by 2 processes
    // the latest one will win and continue to run the job
    await delay(500);

    // ensure we hold the lock
    const reretrievedJobExecutionData = await this.getJobExecutionData(job);
    if (
      reretrievedJobExecutionData.currentExecution === null ||
      reretrievedJobExecutionData.currentExecution.executionId !==
        jobExecutionId
    ) {
      debug(
        `Job '${job.name}': Unable to maintain lock, letting other instance do job`,
      );
      return;
    }

    debug(`Job '${job.name}': Lock acquired, Running`);
    // we still hold the lock, run the job
    try {
      // if this job takes more than 2 min our lock will no longer be valid
      // this means another instance will potentially try to run the job again
      // if it does, we will not release their lock because we won't own it
      // however if a job consistently takes more than 2 minutes to run we could get stuck in a look
      // because the job could constantly be taken over

      await job.funcToRun();
    } catch (e) {
      debug(`Job '${job.name}': threw an error during execution`);

      // release lock
      await this.releaseJobLock(job);

      throw e;
    }

    debug(`Job '${job.name}': Completed`);
    // release the lock and update the lastExecution time
    await this.releaseJobLock(job);
  }

  private getJobExecutionDataKey(job: ICronJob): string {
    return `cronjob_${job.name}`;
  }

  private async getJobExecutionData(job: ICronJob): Promise<IJobExecutionData> {
    const jobDataKey = this.getJobExecutionDataKey(job);
    let jobExecutionData: IJobExecutionData =
      await this._optionsService.getOption(jobDataKey);

    if (jobExecutionData === null) {
      jobExecutionData = {
        name: job.name,
        lastExecution: null,
        currentExecution: null,
      };
    }

    return jobExecutionData;
  }

  private async setJobExecutionData(
    job: ICronJob,
    jobExecutionData: IJobExecutionData,
  ) {
    const jobDataKey = this.getJobExecutionDataKey(job);
    return await this._optionsService.setOption(jobDataKey, jobExecutionData);
  }

  public async releaseJobLock(job: ICronJob) {
    const jobExecutionData = await this.getJobExecutionData(job);

    if (jobExecutionData.currentExecution === null) {
      throw new Error(`Job '${job.name}' is not locked, cannot unlock`);
    }

    if (jobExecutionData.currentExecution.instanceId !== this.instanceId) {
      throw new Error(
        `Job '${job.name}' is not locked by this instance, cannot unlock`,
      );
    }

    debug(`Job '${job.name}': Releasing lock`);
    jobExecutionData.currentExecution = null;
    jobExecutionData.lastExecution = currentUnixTimestamp();
    await this.setJobExecutionData(job, jobExecutionData);
  }
}

// helper func
function secondsSince(timestamp: number): number {
  return currentUnixTimestamp() - timestamp;
}
