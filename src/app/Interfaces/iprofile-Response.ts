import { ITechnichianDetails } from './ItechnichianDetails';

export interface IProfileResponse {
  success: boolean;
  message: string;
  data: ITechnichianDetails; // ✅ لأنها object مش array
}
