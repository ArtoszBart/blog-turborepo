import z, { ZodError } from 'zod';

export const formatErrors = (error: ZodError) => {
  const flattened = z.flattenError(error);

  return Object.fromEntries(
    Object.entries(flattened.fieldErrors).map(([field, errors]) => [
      field,
      (errors as string[])[0],
    ])
  );
};
