import { inject, injectable } from "inversify";

import { IDatabaseService } from "../services/DatabaseService";

import { traceLogging } from "../util/traceLogging";

import debugFactory from "debug";
const debug = debugFactory("next:OptionDal");

export interface IOptionDal {
  getOptionValue(key: string): Promise<string | null>;
  setOptionValue(key: string, value: string): Promise<void>;
  deleteOptionValue(key: string): Promise<void>;
}

@traceLogging("OptionDal")
@injectable()
export class OptionDal implements IOptionDal {
  constructor(
    @inject("DatabaseService") private _databaseService: IDatabaseService,
  ) {}

  public async getOptionValue(key: string): Promise<string | null> {
    const db = this._databaseService.getConnection();
    const res = await db("options").select("value").where("key", key).first();

    if (res === undefined) {
      // key not found
      return null;
    }

    return res.value;
  }

  public async setOptionValue(key: string, value: string): Promise<void> {
    const existingValue = await this.getOptionValue(key);

    const db = this._databaseService.getConnection();

    if (existingValue === null && value !== null && value !== undefined) {
      // no record exists & we have a value to store, insert
      debug(
        `setOptionValue('${key}', ${value}) - No record exists, inserting new`,
      );

      await db("options").insert({
        key,
        value,
      });
      return;
    }

    // record exists
    const existingRecord = db("options").where("key", key);

    if (value !== null && value !== undefined) {
      // record exists, update

      debug(`setOptionValue('${key}', ${value}) - Record exists, updating`);
      await existingRecord.update({
        value,
      });

      return;
    }

    // delete record
    debug(`setOptionValue('${key}', ${value}) - Record exists, deleting`);
    await existingRecord.delete();
  }

  /**
   * delete option value by given key from database
   *
   * @param {string} key
   * @returns {Promise<string | null>}
   */
  public async deleteOptionValue(key: string): Promise<void> {
    // get database connection
    const db = this._databaseService.getConnection();

    // find option by key
    await db("options").where("key", key).first().delete();
  }
}
