import Comments from '@/components/comments/Comments';
import { fetchPostById } from '@/lib/actions/postActions';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import './postPage.scss';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: IProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) notFound();

  const post = await fetchPostById(numericId);
  if (!post) notFound();

  return (
    <main className='post-page'>
      <h1>{post.title}</h1>
      <p className='post-page_meta'>
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className='post-page_thumbnail'>
        <Image
          src={post.thumbnail ?? 'no-image.png'}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className='post-page_content'>{post.content}</div>

      <Comments postId={numericId} />
    </main>
  );
}
