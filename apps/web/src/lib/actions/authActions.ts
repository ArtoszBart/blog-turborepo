'use server';

import { redirect } from 'next/navigation';
import fetchGraphQL, { createUser } from '../graphql';
import { CreateUserResponse } from '../graphql/types/user';
import { formatErrors } from '../zod/formatErrors';
import { SignUpFormDTO, SignUpFormSchema } from '../zod/schemas/signUpForm';
import { FormState } from './types/FormState';

export const signUp = async (
  _: unknown,
  formData: FormData
): FormState<SignUpFormDTO> => {
  const validatedFields = SignUpFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const errors = { ...formatErrors(validatedFields.error) };
    if (errors?.password) {
      errors.password = 'Password does not meet criteria.';
    }

    return {
      data: Object.fromEntries(formData.entries()),
      errors,
    };
  }

  const response = await fetchGraphQL<CreateUserResponse>(createUser, {
    input: validatedFields.data,
  });

  if (response.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: response.errors[0].message,
    };
  }

  redirect('/auth/signin');
};
