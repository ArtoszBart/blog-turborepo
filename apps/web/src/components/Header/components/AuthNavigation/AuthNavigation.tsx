import { getSession } from '@/lib/session';
import Link from 'next/link';
import { FaArrowRightFromBracket, FaListUl, FaPlus } from 'react-icons/fa6';
import AuthNavigationWrapper from '../AuthNavigationWrapper';
import './authMenu.scss';

export default async function AuthNavigation() {
  const session = await getSession();

  if (!session?.user) return <Link href={'/auth/signin'}>Sign In</Link>;

  return (
    <AuthNavigationWrapper user={session.user}>
      <Link href={'user/posts'}>
        <FaListUl />
        <span>Posts</span>
      </Link>
      <Link className='auth-menu_link' href={'/posts/new'}>
        <FaPlus />
        <span>Create New Post</span>
      </Link>
      <a className='auth-menu_link' href={'/api/auth/signout'}>
        <FaArrowRightFromBracket />
        <span>Sign Out</span>
      </a>
    </AuthNavigationWrapper>
  );
}
