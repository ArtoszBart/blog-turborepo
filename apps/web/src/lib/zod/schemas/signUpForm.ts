import { z } from 'zod';

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .trim(),
  email: z.email({ message: 'Please enter a valid email' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-z]/, { message: 'Contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character',
    })
    .trim(),
});

export const validatePassword = (password: string) => {
  const res = SignUpFormSchema.shape.password.safeParse(password);
  if (!res.error) return [];
  return z.treeifyError(res.error).errors;
};

export type SignUpFormDTO = z.infer<typeof SignUpFormSchema>;
