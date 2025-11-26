import { useClickOutside } from '@/lib/useClickOutside';
import { useState } from 'react';

const useAuthNavigationWrapper = () => {
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);

  useClickOutside(
    '.auth-menu',
    () => setIsPopoverOpened(false),
    isPopoverOpened
  );

  return { setIsPopoverOpened, isPopoverOpened };
};

export default useAuthNavigationWrapper;
