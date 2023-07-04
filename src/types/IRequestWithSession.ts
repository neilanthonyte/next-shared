import { Request } from "express";
import { Session } from "next-shared/src/models/Session";

export interface IRequestWithSession extends Request {
  session?: Session;
}
