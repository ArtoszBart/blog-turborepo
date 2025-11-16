import Hero from '@/components/Hero';
import Posts from '@/components/Posts/Posts';
import { fetchPosts } from '@/lib/actions/postActions';
import {
  getPaginationSearchParams,
  PaginationSearchParams,
} from '@/lib/pagination';

interface IProps {
  searchParams: PaginationSearchParams;
}

export default async function HomePage({ searchParams }: IProps) {
  const { page, pageSize } = await getPaginationSearchParams(searchParams);
  const { posts, totalPosts } = await fetchPosts({ page, pageSize });

  return (
    <main className='main-page'>
      <Hero />
      <Posts posts={posts} currentPage={page} totalPosts={totalPosts} />
    </main>
  );
}
