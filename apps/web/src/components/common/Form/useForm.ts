import { FormState } from '@/lib/actions/types/FormState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useEffect } from 'react';
import {
  DefaultValues,
  useForm as rhfUseForm,
  UseFormReturn,
} from 'react-hook-form';
import { ZodObject } from 'zod';

export interface IForm<T> {
  schema: ZodObject;
  defaultValues?: DefaultValues<T>;
  onSubmit: (_: unknown, formData: FormData) => FormState<T>;
  onSuccess?: () => void;
}

export interface IuseFormReturn {
  formProps: UseFormReturn;
  action: (payload: FormData) => void;
  serverErrorMessage: string | undefined;
  isSubmitting: boolean;
}

const useForm = <T>({
  schema,
  defaultValues,
  onSubmit,
  onSuccess,
}: IForm<T>): IuseFormReturn => {
  const [state, action, isSubmitting] = useActionState(onSubmit, undefined);

  const formProps = rhfUseForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues,
  });

  useEffect(() => {
    if (!state) return;

    if (!state.errors && onSuccess) {
      formProps.reset();
      return onSuccess();
    }

    Object.entries(state.data || {}).forEach(([field, value]) =>
      formProps.setValue(field, value, { shouldValidate: false }),
    );

    Object.entries(state.errors || {}).forEach(([field, message]) =>
      formProps.setError(field, { type: 'server', message: message as string }),
    );
  }, [state, formProps, onSuccess]);

  useEffect(() => {
    const subscription = formProps.watch((_, { name }) => {
      if (!name) return;

      const error = formProps.formState.errors[name];
      if (error?.type === 'server') {
        formProps.clearErrors(name);
      }
    });

    return () => subscription.unsubscribe();
  }, [formProps]);

  const serverErrorMessage = isSubmitting ? undefined : state?.message;

  return {
    formProps,
    action,
    serverErrorMessage,
    isSubmitting,
  };
};

export default useForm;
