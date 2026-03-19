export type PostResDTO = {
  id: number;
  title: string;
  content: string;
  thumbnail: string | null;
  createdAt: Date;
  isPublished: boolean;
  author: {
    name: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
} | null;
