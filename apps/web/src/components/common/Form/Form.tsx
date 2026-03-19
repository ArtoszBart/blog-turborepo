'use client';

import { PropsWithChildren } from 'react';
import { FormProvider } from 'react-hook-form';
import SubmitButton from './components/SubmitButton/SubmitButton';
import './form.scss';
import useForm, { IForm } from './useForm';

interface IProps<T> extends IForm<T>, PropsWithChildren {
  submitLabel: string;
  noSubmit?: boolean;
  submitRight?: boolean;
}

export default function Form<T>({
  schema,
  defaultValues,
  children,
  onSubmit,
  submitLabel,
  noSubmit,
  submitRight,
}: IProps<T>) {
  const hook = useForm({ schema, onSubmit, defaultValues });

  return (
    <FormProvider {...hook.formProps}>
      <form className='form' action={hook.action} noValidate>
        {children}

        <span className={`form_error-message`}>{hook.serverErrorMessage}</span>

        {!noSubmit && (
          <SubmitButton
            className={submitRight ? 'submit-right' : ''}
            isSubmitting={hook.isSubmitting}
          >
            {submitLabel}
          </SubmitButton>
        )}
      </form>
    </FormProvider>
  );
}
