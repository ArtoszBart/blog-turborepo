import { FormState } from '@/lib/actions/types/FormState';
import { NewPostForm } from '@/lib/zod/schemas/postSchema';
import { PostResDTO } from '@blog-turborepo/types';
import { useEffect, useState } from 'react';

export interface IPostForm {
  formAction: (_: unknown, payload: FormData) => FormState<NewPostForm>;
  post?: PostResDTO;
}

const usePostForm = ({ formAction, post }: IPostForm) => {
  const [imageUrl, setImageUrl] = useState(post?.thumbnail);

  const defaultValues = post
    ? {
        ...post,
        tags: post.tags.map((tag) => tag.name),
        thumbnail: undefined,
      }
    : undefined;

  const onImageChange = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    setImageUrl(URL.createObjectURL(file));
  };

  const onSubmit = (_: unknown, formData: FormData) => {
    setImageUrl('');
    return formAction(_, formData);
  };

  useEffect(() => {
    return () => {
      if (imageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return { onSubmit, onImageChange, imageUrl, defaultValues };
};

export default usePostForm;
