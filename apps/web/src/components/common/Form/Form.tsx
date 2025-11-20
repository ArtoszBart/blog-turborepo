'use client';

import { PropsWithChildren } from 'react';
import { FormProvider } from 'react-hook-form';
import SubmitButton from './components/SubmitButton/SubmitButton';
import useForm, { IForm } from './useForm';

interface IProps<T> extends IForm<T>, PropsWithChildren {
  className?: string;
}

export default function Form<T>({
  className,
  schema,
  children,
  onSubmit,
}: IProps<T>) {
  const hook = useForm({ schema, onSubmit });

  return (
    <FormProvider {...hook.formProps}>
      <form className={className} action={hook.action} noValidate>
        {children}

        {hook.serverErrorMessage && <span>{hook.serverErrorMessage}</span>}

        <SubmitButton
          isSubmitting={hook.isSubmitting}
          disabled={hook.isSubmitDisabled}
        >
          Sign Up
        </SubmitButton>
      </form>
    </FormProvider>
  );
}
