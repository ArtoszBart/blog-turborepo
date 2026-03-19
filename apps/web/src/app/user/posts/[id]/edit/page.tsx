import PostForm from '@/components/PostForm/PostForm';
import { fetchPostById, updatePost } from '@/lib/actions/postActions';
import { notFound } from 'next/navigation';
import '../../../../../styles/layouts/postFormPage.scss';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function UpdatePostPage({ params }: IProps) {
  const { id } = await params;
  const postId = Number(id);
  if (isNaN(postId)) notFound();

  const post = await fetchPostById(postId);
  if (!post) notFound();

  return (
    <main className='post-form'>
      <div className='post-form_container'>
        <h1>Update Your Post</h1>
        <PostForm formAction={updatePost} post={post} />
      </div>
    </main>
  );
}
