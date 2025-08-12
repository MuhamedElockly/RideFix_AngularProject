import { INotificationInterface } from './inotification-interface';

export interface INotificationResponse {
  success: boolean;
  message: string;
  data: INotificationInterface[];
}
