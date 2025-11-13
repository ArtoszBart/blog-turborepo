import Hero from '@/components/Hero';
import Posts from '@/components/Posts/Posts';
import { fetchPosts } from '@/lib/actions/postActions';

export default async function HomePage() {
  const posts = await fetchPosts();

  return (
    <main>
      <Hero />
      <Posts posts={posts} />
    </main>
  );
}
