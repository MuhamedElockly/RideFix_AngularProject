export interface Ihistorytech {
  isCompleted: boolean;
  technicianId: number;
  requestId: number;
  carOwnerId: number;
  description: string;
  carOwnerName: string;
  faceImageUrl: string;
  requestState: number | null;
  timeStamp: string;
  endTimeStamp: string;
  category: string;
  
}
