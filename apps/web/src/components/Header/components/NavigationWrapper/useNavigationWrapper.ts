import { useClickOutside } from '@/lib/useClickOutside';
import { useCallback, useState } from 'react';

const useNavigationWrapper = () => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const handleHamburgerClick = useCallback(() => {
    setIsMenuOpened((prev) => !prev);
  }, []);

  useClickOutside(
    '.navigation-wrapper',
    () => setIsMenuOpened(false),
    isMenuOpened
  );

  return { handleHamburgerClick, isMenuOpened };
};

export default useNavigationWrapper;
