'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fetchGraphQL, { createUserGql, signInGql } from '../graphql';
import { CreateUserResponse, SignInResponse } from '../graphql/types/user';
import { formatErrors } from '../zod/formatErrors';
import { SignInFormDTO, SignInFormSchema } from '../zod/schemas/signInForm';
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

  const response = await fetchGraphQL<CreateUserResponse>(createUserGql, {
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

export const signIn = async (
  _: unknown,
  formData: FormData
): FormState<SignInFormDTO> => {
  const validatedFields = SignInFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const errors = { ...formatErrors(validatedFields.error) };

    return {
      data: Object.fromEntries(formData.entries()),
      errors,
    };
  }

  const response = await fetchGraphQL<SignInResponse>(signInGql, {
    input: validatedFields.data,
  });

  if (response.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: response.errors[0].message,
    };
  }

  // TODO: create session

  revalidatePath('/');
  redirect('/');
};
