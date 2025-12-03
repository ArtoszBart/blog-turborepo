'use client';

import { fetchPostComments } from '@/lib/actions/commentActions';
import { DEFAULT_COMMENTS_PAGE_SIZE } from '@/lib/pagination/consts/consts';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Paginator from '../Paginator';
import CommentCard, { CommentCardSkeleton } from './CommentCard';
import './comments.scss';

interface IComments {
  postId: number;
}

const skeletons = Array.from({ length: DEFAULT_COMMENTS_PAGE_SIZE });

export default function Comments({ postId }: IComments) {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['GET_POSTS_COMMENTS', postId, page],
    queryFn: async () =>
      await fetchPostComments({
        postId,
        page,
        pageSize: DEFAULT_COMMENTS_PAGE_SIZE,
      }),
  });

  return (
    <div className='comments'>
      <h2>Comments</h2>

      {isLoading
        ? skeletons.map((_, idx) => <CommentCardSkeleton key={idx} />)
        : data?.postComments.map((comment, idx) => (
            <CommentCard key={idx} comment={comment} />
          ))}

      <div className='comments_paginator-wrapper'>
        <Paginator
          currentPage={page}
          totalItems={data?.totalPostComments ?? 0}
          pageSize={DEFAULT_COMMENTS_PAGE_SIZE}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
