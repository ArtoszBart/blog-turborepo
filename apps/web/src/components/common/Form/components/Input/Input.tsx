'use client';

import useInput, { IuseInput } from './useInput';

interface IProps extends IuseInput {
  className?: string;
  label?: string;
  type?: 'text' | 'password' | 'file' | 'checkbox';
  placeholder?: string;
  multiline?: boolean;
  accept?: string;
}

export default function Input(props: IProps) {
  const { inputProps, errorMessage } = useInput(props);

  return (
    <div className={'form_input' + (errorMessage ? ' invalid' : '')}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      {props.multiline ? (
        <textarea
          id={props.name}
          placeholder={props.placeholder}
          {...inputProps}
        ></textarea>
      ) : (
        <input
          id={props.name}
          type={props.type ?? 'text'}
          accept={props.accept}
          placeholder={props.placeholder}
          {...inputProps}
        />
      )}
      <span className='form_error-message'>{errorMessage as string}</span>
    </div>
  );
}
