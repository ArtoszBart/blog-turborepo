import { fetchPostById } from '@/lib/actions/postActions';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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
    <main>
      <h1>{post.title}</h1>
      <p>
        By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div style={{ position: 'relative', width: '400px', height: '300px' }}>
        <Image
          src={post.thumbnail ?? 'no-image.png'}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div>{post.content}</div>
    </main>
  );
}
