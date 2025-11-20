import { PropsWithChildren } from 'react';
import '../../styles/layouts/auth.scss';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className='auth'>
      <div className='auth_container'>{children}</div>
    </main>
  );
}
