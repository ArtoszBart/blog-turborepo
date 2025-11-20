import { FormState } from '@/lib/actions/types/FormState';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useEffect } from 'react';
import { useForm as rhfUseForm } from 'react-hook-form';
import { ZodObject } from 'zod';

export interface IForm<T> {
  schema: ZodObject;
  onSubmit: (_: unknown, formData: FormData) => FormState<T>;
}

const useForm = <T>({ schema, onSubmit }: IForm<T>) => {
  const [state, action, isSubmitting] = useActionState(onSubmit, undefined);

  const formProps = rhfUseForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (!state) return;

    Object.entries(state.data || {}).forEach(([field, value]) =>
      formProps.setValue(field, value, { shouldValidate: false })
    );

    Object.entries(state.errors || {}).forEach(([field, message]) =>
      formProps.setError(field, { type: 'server', message: message as string })
    );
  }, [state, formProps]);

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
  const isSubmitDisabled = !formProps.formState.isValid || isSubmitting;

  return {
    formProps,
    action,
    serverErrorMessage,
    isSubmitting,
    isSubmitDisabled,
  };
};

export default useForm;
