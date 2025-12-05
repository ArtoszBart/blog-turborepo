import Comments from '@/components/Comments';
import Date from '@/components/common/Date';
import { fetchPostById } from '@/lib/actions/postActions';
import { getSession } from '@/lib/session';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import './postPage.scss';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: IProps) {
  const { id } = await params;
  const postId = Number(id);
  if (isNaN(postId)) notFound();

  const post = await fetchPostById(postId);
  if (!post) notFound();

  const session = await getSession();

  return (
    <main className='post-page'>
      <h1>{post.title}</h1>
      <p className='post-page_meta'>
        By {post.author.name} | <Date date={post.createdAt} />
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

      <Comments user={session?.user} postId={postId} />
    </main>
  );
}
