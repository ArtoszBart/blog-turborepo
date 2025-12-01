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
  const tmp = await fetchPosts({ page, pageSize });

  return (
    <main className='main-page'>
      <Hero />
      <Posts
        posts={tmp?.posts ?? []}
        currentPage={page}
        totalPosts={tmp?.totalPosts ?? 0}
      />
    </main>
  );
}
