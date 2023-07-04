import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
} from "class-validator";

import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { IBaseAction } from "next-shared/src/types/IBaseAction";

import { ISerializable } from "../types/ISerializable";
import { cloneModelObject } from "../helpers/cloneModelObject";
import { TOpsActionStatus } from "../types/IOpsActionsWithMetrics";

export interface ISerializedOpsAction {
  id?: number;
  parentId?: string;
  parentType?: string;
  resolved: boolean;
  resolutionAction?: string;
  title: string;
  instructions?: string;
  critical: boolean;
  locationId?: string;
  parentTitle?: string;
  status: TOpsActionStatus;
  resolvedAt?: unixTimestamp;
  createdAt?: unixTimestamp;
  updatedAt?: unixTimestamp;
}

export class OpsAction implements ISerializable {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  parentId: string | null;

  @IsOptional()
  parentType: string | null;

  @IsOptional()
  resolved: boolean;

  @IsOptional()
  resolutionAction: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  instructions: string;

  @IsBoolean()
  critical: boolean;

  @IsString()
  @IsOptional()
  locationId: string;

  @IsString()
  @IsOptional()
  parentTitle: string;

  @IsString()
  status: TOpsActionStatus;

  @IsInt()
  @IsOptional()
  createdAt: unixTimestamp;

  @IsInt()
  @IsOptional()
  resolvedAt: unixTimestamp;

  @IsInt()
  @IsOptional()
  updatedAt: unixTimestamp;

  public isActive(): boolean {
    return this.status === "active";
  }

  public toBaseAction(): IBaseAction {
    const title = [this.title, this.instructions].filter((n) => n).join(" / ");

    return {
      keyDate: this.createdAt,
      resolvedAt: this.resolvedAt,
      disabled: !this.isActive(),
      title: title,
      description: this.instructions,
      comment: this.resolutionAction,
      // icon: this.icon,
    };
  }

  public static unserialize(opsAction: ISerializedOpsAction): OpsAction {
    const newOpsAction = new OpsAction();

    newOpsAction.id = opsAction.id;
    newOpsAction.parentId = opsAction.parentId;
    newOpsAction.parentType = opsAction.parentType;
    newOpsAction.resolved = opsAction.resolved;
    newOpsAction.resolutionAction = opsAction.resolutionAction;
    newOpsAction.title = opsAction.title;
    newOpsAction.instructions = opsAction.instructions;
    newOpsAction.critical = opsAction.critical;
    newOpsAction.locationId = opsAction.locationId;
    newOpsAction.parentTitle = opsAction.parentTitle;
    newOpsAction.status = opsAction.status;
    newOpsAction.resolvedAt = opsAction.resolvedAt;
    newOpsAction.createdAt = opsAction.createdAt;
    newOpsAction.updatedAt = opsAction.updatedAt;

    return newOpsAction;
  }

  public serialize() {
    return {
      id: this.id,
      parentId: this.parentId,
      parentType: this.parentType,
      resolved: this.resolved,
      resolutionAction: this.resolutionAction,
      title: this.title,
      instructions: this.instructions,
      critical: this.critical,
      locationId: this.locationId,
      parentTitle: this.parentTitle,
      status: this.status,
      resolvedAt: this.resolvedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public filterSensitiveData() {
    return cloneModelObject(this);
  }
}
