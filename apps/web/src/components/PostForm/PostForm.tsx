'use client';

import { NewPostForm, postSchema } from '@/lib/zod/schemas/postSchema';
import Image from 'next/image';
import Form, { Input } from '../common/Form';
import usePostForm, { IPostForm } from './usePostForm';

export default function PostForm({ formAction, post }: IPostForm) {
  const hook = usePostForm({ formAction, post });

  return (
    <Form<NewPostForm>
      schema={postSchema}
      onSubmit={hook.onSubmit}
      submitLabel={`${post ? 'Update' : 'Create'} Post`}
      submitRight
      defaultValues={hook.defaultValues}
    >
      <Input name='id' hidden />
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
        onFileChange={hook.onImageChange}
      />

      <Image
        src={hook.imageUrl || '/no-image.webp'}
        alt='post thumbnail'
        width={200}
        height={150}
      />
    </Form>
  );
}
