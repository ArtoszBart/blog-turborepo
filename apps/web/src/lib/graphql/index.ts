export { default } from './fetchGraphQL';

export { default as createPostGql } from './queries/createPost.gql';
export { default as getPostByIdGql } from './queries/getPostById.gql';
export { default as getPostsGql } from './queries/getPosts.gql';
export { default as getUserPostsGql } from './queries/getUserPosts.gql';
export { default as updatePostGql } from './queries/updatePost.gql';

export { default as createCommentGql } from './queries/createComment.gql';
export { default as getPostCommentsGql } from './queries/getPostComments.gql';

export { default as getPostLikesDataGql } from './queries/getPostLikesData.gql';
export { default as likePostGql } from './queries/likePost.gql';
export { default as unlikePostGql } from './queries/unlikePost.gql';

export { default as signInGql } from './queries/signIn.gql';
export { default as signUpGql } from './queries/signUp.gql';
