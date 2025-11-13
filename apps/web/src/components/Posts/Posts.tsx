import { Post } from '@/models/Post';
import PostCard from '../PostCard/PostCard';
import './posts.scss';

interface IProps {
  posts: Post[];
}

export default function Posts({ posts }: IProps) {
  return (
    <section className='latest-posts'>
      <h2>Latest Posts</h2>
      <hr className='hr' />

      <div className='latest-posts_container'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
