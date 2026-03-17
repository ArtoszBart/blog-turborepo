import PostForm from '@/components/PostForm/PostForm';
import { createPost } from '@/lib/actions/postActions';
import './createPost.scss';

export default function CreatePostPage() {
  return (
    <main className='create-post'>
      <div className='create-post_container'>
        <h1>Create a New Post</h1>
        <PostForm formAction={createPost} />
      </div>
    </main>
  );
}
