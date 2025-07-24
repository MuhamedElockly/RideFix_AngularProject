export interface IRegisterStep2 {
  email: string;
  password: string;
  confirmPassword: string;
  ssn: string;
  name: string;
  birthDate: string;
  address: string;
  gender: string;
  role: 'CarOwner' | 'Technician';
  startWorking?: string;
  endWorking?: string;
  description?: string;
}
