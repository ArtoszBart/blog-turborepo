'use client';

import { CSSProperties, PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  style?: CSSProperties;
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
      className='submit-button'
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
