import z from 'zod';

export const NewPostSchema = z.object({
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
    .transform((files) => files?.[0])
    .refine((file) => !file || file.size > 0, {
      message: 'Invalid file',
    }),
  isPublished: z.coerce.boolean().default(false),
});

export type NewPostFormDTO = z.infer<typeof NewPostSchema>;
