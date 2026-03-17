import { useFormContext } from 'react-hook-form';

export interface IuseInput {
  name: string;
  serverErrorsOnly?: boolean;
  onChange?: (value: string) => void;
  onFileChange?: (files: FileList | null) => void;
}

const useInput = (props: IuseInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[props.name];

  const errorMessage =
    fieldError?.type === 'server'
      ? fieldError?.message
      : props.serverErrorsOnly
        ? undefined
        : fieldError?.message;

  const inputProps = register(props.name, {
    onChange: (e) => {
      props.onChange?.(e.target.value);
      props.onFileChange?.(e.target.files);
      return e;
    },
  });

  return { inputProps, errorMessage };
};

export default useInput;
