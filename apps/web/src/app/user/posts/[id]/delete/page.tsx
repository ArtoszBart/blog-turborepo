import SubmitButton from '@/components/common/Form/components/SubmitButton/SubmitButton';
import { deletePost, fetchPostById } from '@/lib/actions/postActions';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import './deletePostPage.scss';

interface IProps {
  params: Promise<{ id: string }>;
}

export default async function DeletePostPage({ params }: IProps) {
  const { id } = await params;
  const postId = Number(id);
  if (isNaN(postId)) notFound();

  const post = await fetchPostById(postId);
  if (!post) notFound();

  const formAction = async () => {
    'use server';
    await deletePost(postId);
    redirect('/user/posts');
  };

  return (
    <main className='delete-post'>
      <div className='delete-post_container'>
        <div className='delete-post_container_header'>
          <h1>Delete Your Post</h1>
          <p>Are you sure you want to delete this post?</p>
        </div>
        <p>
          This action cannot be undone. This will permanently delete your post
          and remove its data from the server.
        </p>

        <div className='delete-post_container_post'>
          <p className='delete-post_container_post_title'>Title of the Post</p>
          <p>{post.title}</p>
        </div>

        <form action={formAction} className='delete-post_container_buttons'>
          <SubmitButton className='danger' isSubmitting={false}>
            Delete Post
          </SubmitButton>
          <Link href='/user/posts' className='button'>
            Cancel
          </Link>
        </form>
      </div>
    </main>
  );
}
