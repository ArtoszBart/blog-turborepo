'use client';

import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import './like.scss';
import useLike from './useLike';

interface IProps {
  postId: number;
}

export default function Like({ postId }: IProps) {
  const { isLoading, toggleLike, state } = useLike(postId);

  if (isLoading || !state) return;

  return (
    <div className='like'>
      <button
        className={'like_button' + (state.isLiked ? ' liked' : '')}
        onClick={() => toggleLike()}
      >
        {state.isLiked ? <FaHeart /> : <FaRegHeart />}
      </button>
      <span>{state.likes}</span>
    </div>
  );
}
