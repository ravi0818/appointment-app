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

export interface IClinicResponse {
  name?: string;
  address?: string;
  contacts: {
    primaryPhone?: string;
    alternativePhone?: string;
    email: string;
  };
  profilePicture?: string;
}

export interface IClinicUpdateRequest {
  name?: string;
  address?: string;
  contacts?: {
    primaryPhone?: string;
    alternativePhone?: string;
  };
  profilePicture?: string;
}

export interface IProfileField {
  key: string;
  label: string;
  value: string;
  onChange: (field: string, value: string) => void;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
}
