'use server';

import type { SignInReqDTO, SignUpReqDTO } from '@blog-turborepo/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fetchGraphQL, { signInGql, signUpGql } from '../graphql';
import { SignInResponse, SignUpResponse } from '../graphql/types/user';
import { createSession } from '../session';
import { formatErrors } from '../zod/formatErrors';
import { SignInFormSchema } from '../zod/schemas/signInForm';
import { SignUpFormSchema } from '../zod/schemas/signUpForm';
import { FormState } from './types/FormState';

export const signUp = async (
  _: unknown,
  formData: FormData
): FormState<SignUpReqDTO> => {
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

  const response = await fetchGraphQL<SignUpResponse, SignUpReqDTO>(
    signUpGql,
    validatedFields.data
  );

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
): FormState<SignInReqDTO> => {
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

  const response = await fetchGraphQL<SignInResponse, SignInReqDTO>(
    signInGql,
    validatedFields.data
  );

  if (response.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: response.errors[0].message,
    };
  }

  const { accessToken, ...user } = response.data!.signIn!;
  await createSession({
    user,
    accessToken,
  });

  revalidatePath('/');
  redirect('/');
};
