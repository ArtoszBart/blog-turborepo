import Hero from '@/components/Hero';
import Posts from '@/components/Posts/Posts';
import { fetchPosts } from '@/lib/actions/postActions';

interface IProps {
  searchParams: Promise<{ page: string | undefined }>;
}

export default async function HomePage({ searchParams }: IProps) {
  const { page } = await searchParams;
  const { posts } = await fetchPosts({ page });

  return (
    <main>
      <Hero />
      <Posts posts={posts} />
    </main>
  );
}
