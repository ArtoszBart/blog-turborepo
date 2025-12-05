import { z } from 'zod';

export const CommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(5, { message: 'Comment must be at least 5 characters long' }),
  postId: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val)),
});
