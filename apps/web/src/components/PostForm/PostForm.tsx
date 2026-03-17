'use client';

import { NewPostFormDTO, NewPostSchema } from '@/lib/zod/schemas/newPostSchema';
import Image from 'next/image';
import Form, { Input } from '../common/Form';
import usePostForm, { IPostForm } from './usePostForm';

export default function PostForm({ formAction }: IPostForm) {
  const { onSubmit, onImageChange, imageUrl } = usePostForm({ formAction });

  return (
    <Form<NewPostFormDTO>
      schema={NewPostSchema}
      onSubmit={onSubmit}
      submitLabel='Create Post'
      submitRight
    >
      <Input
        label='Title'
        name='title'
        placeholder='Enter the title of your post'
      />
      <Input
        label='Content'
        name='content'
        placeholder='Write your post content here'
        multiline
      />
      <Input
        label='Tags (comma-seperated)'
        name='tags'
        placeholder='Enter tags (comma-seperated)'
      />
      <Input
        label='Is published'
        name='isPublished'
        type='checkbox'
        placeholder='Enter tags (comma-separated)'
      />
      <Input
        label='Thumbnail'
        name='thumbnail'
        type='file'
        accept='image/*'
        onFileChange={onImageChange}
      />

      <Image
        src={imageUrl || '/no-image.webp'}
        alt='post thumbnail'
        width={200}
        height={150}
      />
    </Form>
  );
}
