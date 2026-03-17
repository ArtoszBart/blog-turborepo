'use client';

import { CSSProperties, PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  style?: CSSProperties;
  isSubmitting: boolean;
  className?: string;
  form?: string;
}

export default function SubmitButton({
  children,
  isSubmitting,
  className,
  ...props
}: IProps) {
  return (
    <button
      className={'button' + (className ? ` ${className}` : '')}
      type='submit'
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
