import Image from 'next/image';
import Link from 'next/link';
import HeaderWrapper from './components/HeaderWrapper';
import Navigation from './components/Navigation';
import NavigationWrapper from './components/NavigationWrapper';
import './header.scss';

export default async function Header() {
  return (
    <HeaderWrapper>
      <Link href='/' className='logo'>
        <Image src='/logo.webp' alt='logo' width={50} height={50} />
        <span>Playground</span>
      </Link>

      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
    </HeaderWrapper>
  );
}
