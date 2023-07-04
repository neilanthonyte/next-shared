import faker from "faker";
import { IHelixAppointment } from "../types/IHelixAppointment";

export const generateMockHelixAppointment = (
  override?: Partial<IHelixAppointment>,
): IHelixAppointment => {
  const appointmentTypes = [
    { Id: 1, Description: "Initial Consultation" },
    { Id: 2, Description: "Follow-up Consultation" },
    { Id: 3, Description: "Procedure" },
  ];

  const now = new Date();
  const startDateTime = faker.date
    .future(0.5, new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000))
    .toISOString();
  const endDateTime = new Date(
    new Date(startDateTime).getTime() +
      faker.datatype.number({ min: 15, max: 60 }) * 60 * 1000,
  ).toISOString();

  const appointment: IHelixAppointment = {
    Id: faker.datatype.number({ min: 1, max: 100 }),
    CentreId: 1,
    WorkAreaId: 1,
    HcpUserId: faker.datatype.number({ min: 1, max: 100 }),
    StartDateTime: startDateTime,
    EndDateTime: endDateTime,
    AppointmentType: faker.random.arrayElement(appointmentTypes),
    AppointmentStatus: faker.datatype.number({ min: 1, max: 3 }),
    Notes: faker.lorem.sentence(),
    TelehealthUrl: faker.internet.url(),
    Patient: {
      PatientId: faker.datatype.number({ min: 1, max: 1000 }),
      Title: faker.name.prefix(),
      GivenNames: faker.name.firstName(),
      Surname: faker.name.lastName(),
      DateOfBirth: faker.date
        .between(
          new Date(now.getTime() - 80 * 365 * 24 * 60 * 60 * 1000),
          new Date(now.getTime() - 18 * 365 * 24 * 60 * 60 * 1000),
        )
        .toISOString(),
      Status: faker.random.arrayElement([1, 2]) as 1 | 2,
    },
    ...override,
  };

  return appointment;
};
