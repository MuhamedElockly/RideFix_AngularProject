export interface ItechRequect {
isCompleted: boolean;
technicianId:number;
requestId: number;
description: string;
carOwnerId: number;
carOwnerName: string;
faceImageUrl: string;
timeStamp:string
requestState:number | null;
category: string;
latitude: number;
longitude: number;
attachmentUrl:string;
city?: string; // Added city property for filtering
}
