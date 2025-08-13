export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  profileImage?: string;
  registrationDate: Date;
  lastLoginDate?: Date;
  location?: string;
  rating?: number;
  completedRequests?: number;
  carCount?: number;
  requestCount?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
