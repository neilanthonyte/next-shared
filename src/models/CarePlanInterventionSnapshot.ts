import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import {
  PersistableModel,
  ISerializedPersistableModel,
} from "./PersistableModel";
import {
  CarePlanInterventionRole,
  ICarePlanInterventionRole,
} from "./CarePlanInterventionRole";

export interface ICarePlanInterventionSnapshot
  extends ISerializedPersistableModel {
  interventionId?: string;
  goal: string;
  task: string;
  roles: ICarePlanInterventionRole[];
}

/**
 * Care plan interventions are basically goals that include
 *  - a description of what needs to be accomplished
 *  - a task that can be achieved
 *  - and roles of people who are responsible for completing it
 * This helps to create a list of things that need to be done, which can be marked as completed and tracked
 *
 * @class CarePlanInterventionSnapshot
 * @extends AbstractItem
 *
 * @property {string} interventionId - ID of the intervention (can be null)
 * @property {string} goal - Description of the intervention goal
 * @property {string} task - The task required to achieve the goal
 * @property {CarePlanInterventionRole[]} roles - An array of roles responsible for completing the task
 *
 * @param {ICarePlanInterventionSnapshot} data - Data used to create a new CarePlanInterventionSnapshot instance
 *
 * @method serialize() - Serializes the instance into an object of type ICarePlanInterventionSnapshot
 *
 * @example
 * const intervention = new CarePlanInterventionSnapshot({
 *   interventionId: '8cecf383-e1f9-49d1-b801-6fe66df15ba1',
 *   goal: 'Lose weight',
 *   task: 'Walk 10,000 steps a day',
 *   roles: [new CarePlanInterventionRole({ roleId: '1', roleName: 'Cardiologist', isAlliedHealth: false })]
 * });
 */
export class CarePlanInterventionSnapshot extends PersistableModel {
  @IsOptional()
  @IsString()
  interventionId: string;

  @IsString()
  goal: string;

  @IsString()
  task: string;

  @IsArray()
  @ValidateNested({ each: true })
  roles: CarePlanInterventionRole[];

  constructor(data: ICarePlanInterventionSnapshot) {
    super(data);
    this.interventionId = data.interventionId;
    this.goal = data.goal;
    this.task = data.task;
    this.roles = data.roles.map((role) => new CarePlanInterventionRole(role));
  }

  public serialize(): ICarePlanInterventionSnapshot {
    return {
      ...super.serialize(),
      interventionId: this.interventionId,
      goal: this.goal,
      task: this.task,
      roles: this.roles.map((role) => role.serialize()),
    };
  }
}
