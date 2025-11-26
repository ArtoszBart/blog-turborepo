'use client';

import { User } from '@/models/User';
import { PropsWithChildren } from 'react';
import Avatar from '../../../Avatar/Avatar';
import useAuthNavigationWrapper from './useAuthNavigationWrapper';

interface IProps extends PropsWithChildren {
  user: Pick<User, 'name' | 'avatar'>;
}

export default function AuthNavigationWrapper({ user, children }: IProps) {
  const { setIsPopoverOpened, isPopoverOpened } = useAuthNavigationWrapper();

  return (
    <>
      <div className='auth-menu_trigger'>
        <Avatar
          avatarUrl={user.avatar}
          onClick={() => setIsPopoverOpened((prev) => !prev)}
        />
      </div>
      <div className={'auth-menu' + (isPopoverOpened ? ' opened' : '')}>
        <div className='auth-menu_userinfo'>
          <Avatar avatarUrl={user.avatar} />
          <p>{user.name}</p>
        </div>
        {children}
      </div>
    </>
  );
}
