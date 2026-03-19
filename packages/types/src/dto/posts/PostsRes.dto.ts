export type PostsResDTO = {
  id: number;
  slug: string;
  title: string;
  content: string;
  thumbnail: string | null;
  isPublished: boolean;
  createdAt: Date;
};
