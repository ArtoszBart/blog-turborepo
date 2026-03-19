import NoPosts from '@/components/NoPosts/NoPosts';
import Paginator from '@/components/Paginator';
import UserPostList from '@/components/UserPostList/UserPostList';
import { fetchUserPosts } from '@/lib/actions/postActions';
import {
  getPaginationSearchParams,
  PaginationSearchParams,
} from '@/lib/pagination';
import { DEFAULT_USER_POSTS_PAGE_SIZE } from '@/lib/pagination/consts/consts';

interface IProps {
  searchParams: PaginationSearchParams;
}

export default async function UserPostPage({ searchParams }: IProps) {
  const { page, pageSize } = await getPaginationSearchParams(
    searchParams,
    DEFAULT_USER_POSTS_PAGE_SIZE,
  );
  const result = await fetchUserPosts({ page, pageSize });

  return (
    <main>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your posts</h1>
      {result?.userPosts?.length ? (
        <>
          <UserPostList posts={result.userPosts} />
          <Paginator
            currentPage={page}
            pageSize={pageSize}
            totalItems={result.userTotalPosts}
          />
        </>
      ) : (
        <NoPosts />
      )}
    </main>
  );
}
