export interface IAppointmentTypesAndFees {
  label: string; // "Standard", "Long", "Procedure"
  duration: number; // in minutes
  price: string; // "$80"
}

export interface IOpeningHours {
  label: string; // "Monday", "Tuesday", ... "Sunday"
  opening: string; // "9:00am"
  closing: string; // "5:00pm"
}
