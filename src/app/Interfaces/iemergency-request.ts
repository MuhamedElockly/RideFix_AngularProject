export interface IEmergencyRequest {
  technicianIDs: Number[];
  description: string;
  imageUrl: string[];
  categoryId: Number;
  carOwnerId: Number;
  latitude: Number;
  longitude: Number;
  pin: Number;
}
