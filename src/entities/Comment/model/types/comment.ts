import { User } from '@/entities/User';

export interface Comment {
  id: string;
  text: string;
  articleId: string;
  timestamp: number;
  user: User;
}
