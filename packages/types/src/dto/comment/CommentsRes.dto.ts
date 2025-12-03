import { Comment } from '../../models/Comment.model';
import { User } from '../../models/User.model';

export type CommentsResDTO = Pick<Comment, 'id' | 'content' | 'createdAt'> & {
  author: Pick<User, 'name' | 'avatar'>;
};
