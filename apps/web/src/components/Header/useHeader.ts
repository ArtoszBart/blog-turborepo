import { useCallback, useEffect, useState } from 'react';

const useHeader = () => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleHamburgerClick = useCallback(() => {
    setIsMenuOpened((prev) => !prev);
  }, []);

  const handleMenuItemClick = useCallback(() => {
    setIsMenuOpened(false);
  }, []);

  useEffect(() => {
    if (!isMenuOpened) return;

    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.querySelector('header nav');
      const button = document.querySelector('.menu-btn-icon');

      if (
        nav &&
        !nav.contains(e.target as Node) &&
        button &&
        !button.contains(e.target as Node)
      ) {
        setIsMenuOpened(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpened]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    handleHamburgerClick,
    handleMenuItemClick,
    isMenuOpened,
    isScrolled,
  };
};

export default useHeader;
