import PostForm from '@/components/PostForm/PostForm';
import { createPost } from '@/lib/actions/postActions';
import '../../../../styles/layouts/postFormPage.scss';

export default function CreatePostPage() {
  return (
    <main className='post-form'>
      <div className='post-form_container'>
        <h1>Create a New Post</h1>
        <PostForm formAction={createPost} />
      </div>
    </main>
  );
}
