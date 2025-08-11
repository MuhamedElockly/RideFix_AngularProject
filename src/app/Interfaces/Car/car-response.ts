import { ICar } from './icar';

export interface ICarResponse {
  success: boolean;
  message: string;
  data: ICar;
}
