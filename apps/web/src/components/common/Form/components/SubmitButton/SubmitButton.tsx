'use client';

import { CSSProperties, PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  style?: CSSProperties;
  onSubmit?: (e: unknown) => void;
  disabled: boolean;
  isSubmitting: boolean;
}

export default function SubmitButton({
  children,
  isSubmitting,
  ...props
}: IProps) {
  return (
    <button
      onClick={props.onSubmit}
      type='submit'
      aria-disabled={props.disabled}
      {...props}
    >
      {isSubmitting ? (
        <span className='button_loading'>
          <span />
          <span />
          <span />
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
