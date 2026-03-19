'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import './modal.scss';

interface IProps {
  params: Promise<{ id: string }>;
}

export default function InterceptorDeletePostPage(props: IProps) {
  const { id } = use(props.params);
  const postId = Number(id);
  if (isNaN(postId)) notFound();

  const handleDelete = async () => {
    await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
    });

    window.location.assign('/user/posts');
  };

  return (
    <div className='modal'>
      <div className='modal_container'>
        <h3 className='modal_container_title'>Delete this post?</h3>
        <p>
          This action cannot be undone. This will permanently delete your post
          and remove its data from the server.
        </p>
        <div className='modal_container_buttons'>
          <button className='button danger' onClick={handleDelete}>
            Delete post
          </button>
          <a className='button' href={'/user/posts'}>
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}
