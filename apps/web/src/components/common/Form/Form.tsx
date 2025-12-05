'use client';

import { PropsWithChildren } from 'react';
import { FormProvider } from 'react-hook-form';
import SubmitButton from './components/SubmitButton/SubmitButton';
import './form.scss';
import useForm, { IForm } from './useForm';

interface IProps<T> extends IForm<T>, PropsWithChildren {
  submitLabel: string;
  noSubmit?: boolean;
}

export default function Form<T>({
  schema,
  children,
  onSubmit,
  submitLabel,
  noSubmit,
}: IProps<T>) {
  const hook = useForm({ schema, onSubmit });

  return (
    <FormProvider {...hook.formProps}>
      <form className='form' action={hook.action} noValidate>
        {children}

        <span className={`form_error-message`}>{hook.serverErrorMessage}</span>

        {!noSubmit && (
          <SubmitButton isSubmitting={hook.isSubmitting}>
            {submitLabel}
          </SubmitButton>
        )}
      </form>
    </FormProvider>
  );
}
