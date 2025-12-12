import Link from 'next/link';
import { FaPenToSquare } from 'react-icons/fa6';
import './noPosts.scss';

export default function NoPosts() {
  return (
    <div className='no-post'>
      <h2>It looks like there&apos;s nothing here yet</h2>

      <Link className='button' href='/post/new'>
        <FaPenToSquare />
        Create your first post
      </Link>
    </div>
  );
}
