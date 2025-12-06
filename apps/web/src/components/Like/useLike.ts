import {
  getPostLikesData,
  likePost,
  unlikePost,
} from '@/lib/actions/likeActions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface ILikeState {
  isLiked: boolean;
  likes: number;
}

const useLike = (postId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['POST_LIKES_DATA', postId],
    queryFn: () => getPostLikesData(postId),
  });

  const [state, setState] = useState<ILikeState>();

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      if (!state) return;

      setState((prev) => ({
        isLiked: !prev!.isLiked,
        likes: prev!.isLiked ? prev!.likes! - 1 : prev!.likes! + 1,
      }));

      return state.isLiked ? unlikePost(postId) : likePost(postId);
    },
    onError: () => {
      if (!state) return;
      setState((prev) => ({
        isLiked: !prev!.isLiked,
        likes: prev!.isLiked ? prev!.likes! + 1 : prev!.likes! - 1,
      }));
    },
  });

  useEffect(() => {
    if (data) {
      setState({
        isLiked: data.userLikedPost,
        likes: data.postLikesCount,
      });
    }
  }, [data]);

  return {
    isLoading,
    toggleLike: toggleLikeMutation.mutate,
    state,
  };
};

export default useLike;
