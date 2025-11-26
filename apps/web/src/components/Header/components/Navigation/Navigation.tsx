import Link from 'next/link';
import AuthNavigation from '../AuthNavigation';

export default function Navigation() {
  return (
    <nav>
      <Link href='/'>Blog</Link>
      <Link href='#about'>About</Link>
      <Link href='#contact'>Contact</Link>
      <AuthNavigation />
    </nav>
  );
}
