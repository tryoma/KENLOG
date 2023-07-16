export interface Comment {
  id: number;
  userId: number;
  recordId: number;
  status: string;
  comment: string | null;
}
