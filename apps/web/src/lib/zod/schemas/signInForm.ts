import { z } from 'zod';

export const SignInFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }).trim(),
  password: z.string().min(1, { message: 'Password cannot be empty' }),
});

export type SignInFormDTO = z.infer<typeof SignInFormSchema>;
