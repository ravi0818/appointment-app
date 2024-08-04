export interface IPatientResponse {
  name?: string;
  age?: number;
  gender?: string;
  address?: string;
  contacts: {
    primaryPhone?: string;
    alternativePhone?: string;
    email: string;
  };
  profilePicture?: string;
}

export interface IPatientUpdateRequest {
  name?: string;
  age?: number;
  gender?: string;
  address?: string;
  contacts?: {
    primaryPhone?: string;
    alternativePhone?: string;
  };
  profilePicture?: string;
}
