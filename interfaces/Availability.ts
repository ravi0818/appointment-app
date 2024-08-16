export interface IAvailability {
  _id?: string;
  day: string;
  startTime: string;
  endTime: string;
  maxAppointments: string;
}

export interface IAvailabilityFormData {
  day: string;
  startTime: string;
  endTime: string;
  maxAppointments: string;
}

export interface IAvailabilityRequest {
  doctorId: string;
  day: string;
  startTime: string;
  endTime: string;
  maxAppointments: string;
}

export interface ISlotsRequest {
  availabilityId: string;
  date: string;
}

export interface ISlotsResponse {
  totalSlots: number;
  remainingSlots: number;
}
