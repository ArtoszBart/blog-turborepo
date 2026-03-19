import { PropsWithChildren, ReactNode } from 'react';

interface IProps extends PropsWithChildren {
  modal: ReactNode;
}

export default function PostsLayout({ modal, children }: IProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
