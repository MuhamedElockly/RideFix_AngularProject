export interface IRegisterStep1 {
  email: string;
  password: string;
  confirmPassword: string;
  ssn: string;
  name: string;
  birthDate: string;
  address: string;
  gender: string;
  pin: number | null;
  role: string;
  startWorking?: string;
  endWorking?: string;
  description?: string;
}
