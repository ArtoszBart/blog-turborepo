import { FormState } from '@/lib/actions/types/FormState';
import { NewPostFormDTO } from '@/lib/zod/schemas/newPostSchema';
import { useEffect, useState } from 'react';

export interface IPostForm {
  formAction: (_: unknown, payload: FormData) => FormState<NewPostFormDTO>;
}

const usePostForm = ({ formAction }: IPostForm) => {
  const [imageUrl, setImageUrl] = useState<string>();

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

  return { onSubmit, onImageChange, imageUrl };
};

export default usePostForm;
