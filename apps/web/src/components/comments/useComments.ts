import useForm from '@/components/common/Form/useForm';
import { createComment, fetchPostComments } from '@/lib/actions/commentActions';
import { DEFAULT_COMMENTS_PAGE_SIZE } from '@/lib/pagination/consts/consts';
import { CommentSchema } from '@/lib/zod/schemas/commentForm';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

const useComments = (postId: number) => {
  const [page, setPage] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['POST_COMMENTS', postId, page],
    queryFn: () =>
      fetchPostComments({ postId, page, pageSize: DEFAULT_COMMENTS_PAGE_SIZE }),
  });

  const formHook = useForm({
    schema: CommentSchema,
    onSubmit: createComment,
    onSuccess: useCallback(() => {
      setIsFormVisible(false);
      refetch();
    }, [refetch]),
  });

  const showForm = () => setIsFormVisible(true);
  const hideForm = () => {
    formHook.formProps.reset();
    setIsFormVisible(false);
  };

  return {
    isFormVisible,
    formHook,
    showForm,
    hideForm,
    isLoading,
    page,
    data,
    setPage,
  };
};

export default useComments;
