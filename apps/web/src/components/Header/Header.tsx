'use client';

import Image from 'next/image';
import Link from 'next/link';
import HamburgerButton from '../HamburgerButton';
import './header.scss';
import useHeader from './useHeader';

export default function Header() {
  const hook = useHeader();

  return (
    <header className={hook.isScrolled || !hook.isHomePage ? 'scrolled' : ''}>
      <Link href='/' className='logo'>
        <Image src='/logo.webp' alt='hero image' width={50} height={50} />
        <span>Playground</span>
      </Link>

      <nav className={hook.isMenuOpened ? 'opened' : ''}>
        <Link href='/' onClick={hook.handleMenuItemClick}>
          Blog
        </Link>
        <Link href='#about' onClick={hook.handleMenuItemClick}>
          About
        </Link>
        <Link href='#contact' onClick={hook.handleMenuItemClick}>
          Contact
        </Link>
      </nav>

      <HamburgerButton
        isOpened={hook.isMenuOpened}
        onClick={hook.handleHamburgerClick}
      />
    </header>
  );
}
