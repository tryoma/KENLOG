import { Comment } from './comment';

export interface FrontendRecord {
  id: number;
  userId: number;
  title: string;
  postDate: string;
  description: string;
  place: string;
  youtubeURL: string;
  comments: Comment[] | [];
}
