export interface IAppointmentRequest {
  availabilityId: string;
  date: string;
}

export interface ICancelAppointmentRequest {
  appointmentId: string;
}

export interface IGetDoctorAppointmentsRequest {
  doctorId: string;
  date: string;
}

export interface IAppointment {
  _id: string;
  doctorId: string;
  userId: string;
  availabilityId: string;
  date: string;
  status: string;
}
