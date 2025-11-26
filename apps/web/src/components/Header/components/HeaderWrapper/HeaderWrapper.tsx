'use client';

import { PropsWithChildren } from 'react';
import useHeaderWrapper from './useHeaderWrapper';

export default function HeaderWrapper({ children }: PropsWithChildren) {
  const hook = useHeaderWrapper();

  return (
    <header className={hook.isScrolled || !hook.isHomePage ? 'scrolled' : ''}>
      {children}
    </header>
  );
}
