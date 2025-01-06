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

interface Doctor {
  name: string;
  specialization: string;
}

interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}
export interface IAppointmentDetails {
  _id: string;
  doctorId: Doctor;
  userId: string;
  availabilityId: Availability;
  date: string;
  status: string;
}
