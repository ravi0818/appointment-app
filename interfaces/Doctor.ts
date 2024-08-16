export interface IDoctorResponse {
  _id: string;
  userId: string;
  name: string;
  gender: string;
  description: string;
  specialization: string;
  // availability: IAvailability[];
}

export interface IDoctorFormData {
  name: string;
  gender: string;
  description: string;
  specialization: string;
}
