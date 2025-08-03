export interface IRequestDetails {
  city: string;
  description: string;
  technicianName: string;
  rate: number;
  comment: string | null;
  categoryName: string;
  requestDate: string; // أو ممكن تستخدم Date لو هتعمل parsing
}
