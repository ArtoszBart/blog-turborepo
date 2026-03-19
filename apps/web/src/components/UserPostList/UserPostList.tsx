import type { UserPostsResDTO } from '@blog-turborepo/types';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaCheck,
  FaPenToSquare,
  FaRegEye,
  FaRegTrashCan,
  FaXmark,
} from 'react-icons/fa6';
import Date from '../common/Date';
import Tooltip from '../common/Tooltip';
import './userPostList.scss';

interface IProps {
  posts: UserPostsResDTO[];
}

export default function UserPostList({ posts }: IProps) {
  return (
    <div className='user-posts'>
      <div className='user-posts_headers'>
        <p></p>
        <p></p>
        <p>Created At</p>
        <p>Is published</p>
        <p>Likes</p>
        <p>Comments</p>
        <p>Actions</p>
      </div>

      {posts.map((post) => (
        <div key={post.id} className='user-posts_entry'>
          <div className='user-posts_entry_thumbnail'>
            <Image
              src={post.thumbnail || '/no-image.webp'}
              alt={post.title}
              fill
            />
          </div>
          <div className='user-posts_entry_draft'>
            <h2 className='user-posts_entry_draft_title'>{post.title}</h2>
            <p className='user-posts_entry_draft_content'>{post.content}</p>
          </div>
          <span>
            <Date date={post.createdAt} />
          </span>
          <span>
            {post.isPublished ? (
              <FaCheck className='user-posts_entry_check' />
            ) : (
              <FaXmark className='user-posts_entry_x-mark' />
            )}
          </span>
          <span>{post._count.likes}</span>
          <span>{post._count.comments}</span>
          <span className='user-posts_entry_actions'>
            <Link
              href={`/blog/${post.slug}/${post.id}`}
              className='user-posts_entry_actions_show'
            >
              <Tooltip text='Show'>
                <FaRegEye />
              </Tooltip>
            </Link>
            <Link
              href={`/user/posts/${post.id}/edit`}
              className='user-posts_entry_actions_edit'
            >
              <Tooltip text='Edit'>
                <FaPenToSquare />
              </Tooltip>
            </Link>
            <Link href={`/user/posts/${post.id}/delete`}>
              <Tooltip text='Delete'>
                <FaRegTrashCan className='user-posts_entry_actions_delete' />
              </Tooltip>
            </Link>
          </span>
        </div>
      ))}
    </div>
  );
}
