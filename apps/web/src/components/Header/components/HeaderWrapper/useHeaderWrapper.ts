import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useHeaderWrapper = () => {
  const pathName = usePathname();
  const isHomePage = pathName === '/';

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    isScrolled,
    isHomePage,
  };
};

export default useHeaderWrapper;
