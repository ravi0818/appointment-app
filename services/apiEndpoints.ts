export const API_ENDPOINTS = {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
  },
  patient: {
    profile: 'patient/profile',
  },
  clinic: {
    profile: 'clinic/profile',
  },
  user: {
    savePushToken: 'user/save-push-token',
  },
  doctor: {
    addDoctor: 'doctor',
    getDoctors: 'doctor',
    getAllDoctors: 'doctor/all',
    getDoctorById: (id: string) => `doctor/${id}`,
    updateDoctor: (id: string) => `doctor/${id}`,
    deleteDoctor: (id: string) => `doctor/${id}`,
  },
  availability: {
    create: 'availability',
    getDoctorAvailability: (id: string) => `availability/doctor/${id}`,
    update: (id: string) => `availability/${id}`,
    delete: (id: string) => `availability/${id}`,
    getRemainingSlots: (availabilityId: string, date: string) =>
      `availability/slots?availabilityId=${availabilityId}&date=${date}`,
  },
  appointment: {
    bookAppointment: 'appointment',
    getUserAppointments: 'appointment/user',
    cancelAppointment: (id: string) => `appointment/${id}/cancel`,
    getDoctorAppointmentsByDate: (doctorId: string, date: string) => `appointment/doctor/${doctorId}?date=${date}`,
    deleteAppointment: (id: string) => `appointment/${id}`,
  },
};
