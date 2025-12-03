import { DEFAULT_PAGE_SIZE } from '@/lib/pagination/consts/consts';
import type { PostsResDTO } from '@blog-turborepo/types';
import Paginator from '../Paginator';
import PostCard from '../PostCard/PostCard';
import './posts.scss';

interface IProps {
  posts: PostsResDTO[];
  currentPage: number;
  totalPosts: number;
}

export default function Posts(props: IProps) {
  return (
    <section className='latest-posts'>
      <h2>Latest Posts</h2>
      <hr className='hr' />

      <div className='latest-posts_container'>
        {props.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Paginator
        currentPage={props.currentPage}
        totalItems={props.totalPosts}
        pageSize={DEFAULT_PAGE_SIZE}
      />
    </section>
  );
}
