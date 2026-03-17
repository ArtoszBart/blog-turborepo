'use client';

import { DEFAULT_COMMENTS_PAGE_SIZE } from '@/lib/pagination/consts/consts';
import { SessionUser } from '@/lib/session';
import Paginator from '../Paginator';
import './comments.scss';
import CommentCard, { CommentCardSkeleton } from './components/CommentCard';
import CommentForm from './components/CommentForm';
import CommentsHeader from './components/CommentsHeader';
import useComments from './useComments';

interface IProps {
  postId: number;
  user?: SessionUser;
}

export default function Comments({ postId, user }: IProps) {
  const hook = useComments(postId);

  return (
    <div className='comments'>
      <CommentsHeader
        isUserAuth={!!user}
        isFormVisible={hook.isFormVisible}
        isSubmitting={hook.formHook.isSubmitting}
        showForm={hook.showForm}
        hideForm={hook.hideForm}
        commentsCount={hook.data?.postComments.length || 0}
      />

      {user && (
        <CommentForm
          hook={hook.formHook}
          postId={postId}
          isVisible={hook.isFormVisible}
        />
      )}

      {hook.isLoading ? (
        <CommentCardSkeleton count={3} />
      ) : (
        hook.data?.postComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      )}

      <div className='comments_paginator-wrapper'>
        <Paginator
          currentPage={hook.page}
          totalItems={hook.data?.totalPostComments ?? 0}
          pageSize={DEFAULT_COMMENTS_PAGE_SIZE}
          setPage={hook.setPage}
        />
      </div>
    </div>
  );
}
