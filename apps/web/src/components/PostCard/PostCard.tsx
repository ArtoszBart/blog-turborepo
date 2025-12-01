import type { PostsResDTO } from '@blog-turborepo/types';
import Image from 'next/image';
import Link from 'next/link';
import './postCard.scss';

export default function PostCard({ post }: { post: PostsResDTO }) {
  return (
    <div className='post-card'>
      <div className='post-card_thumbnail'>
        <Image
          src={post.thumbnail ?? '/no-image.webp'}
          alt={post.title ?? ''}
          fill
        />
      </div>
      <div className='post-card_content'>
        <h3 className='post-card_content_title'>{post.title}</h3>

        <p className='post-card_content_snippet'>
          {post.content.slice(0, 150)}...
        </p>
        <Link
          className='post-card_content_link'
          href={`/blog/${post.slug}/${post.id}`}
        >
          Read more
        </Link>
      </div>
      <p className='post-card_footer'>
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
