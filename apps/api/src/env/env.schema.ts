import { z } from 'zod';

export const envSchema = z.object({
  FRONTEND_URL: z
    .string({
      message: 'missing variable',
    })
    .pipe(z.url({ message: 'variable must be a valid URL' })),
  DATABASE_URL: z.string({ message: 'missing variable' }),
  JWT_SECRET: z.string({ message: 'missing variable' }),
  JWT_EXPIRES_IN: z
    .string({ message: 'missing variable' })
    .regex(/^\d+(y|w|d|h|m|s|ms)$/, {
      message: 'variable must be a valid period string (e.g., 1d, 2h, 30m)',
    }),
  GOOGLE_CLIENT_ID: z.string({ message: 'missing variable' }),
  GOOGLE_CLIENT_SECRET: z.string({ message: 'missing variable' }),
  GOOGLE_CALLBACK_URL: z
    .string({
      message: 'missing variable',
    })
    .pipe(z.url({ message: 'variable must be a valid URL' })),
});

export const validateEnv = (env: NodeJS.ProcessEnv) => {
  const result = envSchema.safeParse(env);
  if (result.error) {
    const errors = z.flattenError(result.error).fieldErrors;
    const errorMessage = Object.entries(errors)
      .map(([field, messages]) => `${field}: ${messages?.join(', ')}`)
      .join('\n');

    throw new Error('.env file validation errors:\n' + errorMessage);
  }

  return result.data;
};
