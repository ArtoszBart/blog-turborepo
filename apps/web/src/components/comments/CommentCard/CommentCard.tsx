import Avatar from '@/components/Avatar';
import Date from '@/components/common/Date';
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
          <Date
            className='comments_card_header_meta_date'
            date={comment.createdAt}
          />
        </div>
      </div>

      <p className='comments_card_content'>{comment.content}</p>
    </div>
  );
}
