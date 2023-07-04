import { inject, injectable } from "inversify";

import { IOptionDal } from "../dal/OptionDal";
import { traceLogging } from "../util/traceLogging";

export interface IOptionService {
  getOption(key: string): Promise<any | null>;
  setOption(key: string, value: any): Promise<void>;
  deleteOption(key: string): Promise<void>;
}

@traceLogging("OptionService")
@injectable()
export class OptionService implements IOptionService {
  constructor(@inject("OptionDal") private _optionDal: IOptionDal) {}

  public async getOption(key: string): Promise<any | null> {
    const strVal = await this._optionDal.getOptionValue(key);

    try {
      return JSON.parse(strVal);
    } catch (e) {
      throw new Error(`Unable to parse option value for key '${key}'`);
    }
  }

  public async setOption(key: string, value: any): Promise<void> {
    const jsonValue = JSON.stringify(value);
    return this._optionDal.setOptionValue(key, jsonValue);
  }

  /**
   * delete an options
   *
   * @param {string} key
   * @returns {Promise<void>}
   */
  public async deleteOption(key: string): Promise<void> {
    await this._optionDal.deleteOptionValue(key);
  }
}
