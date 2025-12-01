export type PostsResDTO = {
  id: number;
  slug: string;
  title: string;
  content: string;
  thumbnail: string | null;
  createdAt: Date;
};
