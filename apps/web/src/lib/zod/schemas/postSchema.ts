import z from 'zod';

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(120, { message: 'Title cannot exceed 120 characters' }),
  content: z
    .string()
    .trim()
    .min(10, { message: 'Content must be at least 10 characters' }),
  tags: z
    .string()
    .trim()
    .refine((value) => value?.split(',').every((tag) => tag.trim() !== ''))
    .transform((value) => value?.split(',')),
  thumbnail: z
    .any()
    .optional()
    .transform((files): File | undefined => {
      if (files instanceof File) return files;
      if (files?.length) return files[0];
      return undefined;
    }),
  isPublished: z.coerce.boolean().default(false),
});

export type NewPostForm = z.infer<typeof postSchema>;
export type UpdatePostForm = NewPostForm & {
  postId: number;
};
