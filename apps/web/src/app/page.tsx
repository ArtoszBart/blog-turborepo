import Hero from '@/components/Hero';
import Posts from '@/components/Posts/Posts';
import { fetchPosts } from '@/lib/actions/postActions';
import {
  getPaginationSearchParams,
  PaginationSearchParams,
} from '@/lib/pagination';
import { DEFAULT_HOMEPAGE_POSTS_SIZE } from '@/lib/pagination/consts/consts';

interface IProps {
  searchParams: PaginationSearchParams;
}

export default async function HomePage({ searchParams }: IProps) {
  const { page, pageSize } = await getPaginationSearchParams(
    searchParams,
    DEFAULT_HOMEPAGE_POSTS_SIZE
  );
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
