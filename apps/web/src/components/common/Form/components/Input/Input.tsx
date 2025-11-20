'use client';

import useInput, { IuseInput } from './useInput';

interface IProps extends IuseInput {
  className?: string;
  label: string;
  type?: 'text' | 'password';
  placeholder?: string;
}

export default function Input(props: IProps) {
  const { inputProps, errorMessage } = useInput(props);

  return (
    <div className={props.className + (errorMessage ? ' invalid' : '')}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        {...inputProps}
      />
      <span className={`${props.className}_error-message`}>
        {errorMessage as string}
      </span>
    </div>
  );
}
