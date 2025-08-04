import { ICar } from './icar';

export interface CarResponse {
  success: boolean;
  message: string;
  data: ICar;
}
