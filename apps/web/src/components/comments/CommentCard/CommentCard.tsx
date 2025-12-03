import Avatar from '@/components/Avatar';
import type { CommentsResDTO } from '@blog-turborepo/types';
import './commentCard.scss';

interface IProps {
  comment: CommentsResDTO;
}

export default function CommentCard({ comment }: IProps) {
  return (
    <div className='comments_card'>
      <div className='comments_card_header'>
        <Avatar avatarUrl={comment.author.avatar} />

        <div className='comments_card_header_meta'>
          <p className='comments_card_header_meta_author-name'>
            {comment.author.name}
          </p>
          <p className='comments_card_header_meta_date'>
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className='comments_card_content'>{comment.content}</p>
    </div>
  );
}
