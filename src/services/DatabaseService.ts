import { inject, injectable } from "inversify";
import { knex, Knex } from "knex";

import { traceLogging } from "../util/traceLogging";
import { IConfig } from "../IoC/config";

export interface IDatabaseService {
  connect(): void;
  getConnection(): Knex;
  migrate(): Promise<void>;
  seed(): Promise<void>;
}

@traceLogging("DatabaseService")
@injectable()
export class DatabaseService implements IDatabaseService {
  private db: Knex | null = null;

  constructor(@inject("config") private _config: IConfig) {}

  public connect() {
    this.db = knex({
      client: "pg",
      connection: this._config.databaseUrl,
    });
  }

  public getConnection(): Knex {
    if (this.db === null) {
      throw new Error("db has not connected yet");
    }

    return this.db;
  }

  public async migrate() {
    if (this.db === null) {
      throw new Error("db has not connected yet");
    }
    if (this.checkLocalEnvOptOut()) {
      await this.db.migrate.latest();
    }
  }

  public async seed() {
    if (this.db === null) {
      throw new Error("db has not connected yet");
    }

    if (this.checkLocalEnvOptOut()) {
      await this.db.seed.run();
    }
  }

  private checkLocalEnvOptOut() {
    // Add 'LOCALDEVFLAG=true' to .env to enable this check (opt in); when this check
    // is enabled with that var, migrate will only run on localhost database target on startup
    if (
      process.env.LOCALDEVFLAG &&
      this._config.databaseUrl.indexOf("@localhost") === -1
    ) {
      console.warn(
        `Environment variable LOCALDEVFLAG set to true, database migrate and seed will not run on remote database ${this._config.databaseUrl}`,
      );
      return false;
    }
    return true;
  }
}
