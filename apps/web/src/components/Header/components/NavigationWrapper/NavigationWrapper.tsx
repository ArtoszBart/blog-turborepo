'use client';

import { PropsWithChildren } from 'react';
import HamburgerButton from '../HamburgerButton';
import './navigationWrapper.scss';
import useNavigationWrapper from './useNavigationWrapper';

export default function NavigationWrapper({ children }: PropsWithChildren) {
  const hook = useNavigationWrapper();

  return (
    <div
      className={'navigation-wrapper' + (hook.isMenuOpened ? ' opened' : '')}
    >
      {children}

      <HamburgerButton
        isOpened={hook.isMenuOpened}
        onClick={hook.handleHamburgerClick}
      />
    </div>
  );
}
