import SignInForm from '@/components/SignInForm/SignInForm';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <>
      <h1 className='auth_title'>Sign In</h1>

      <SignInForm />

      <div className='auth_footer'>
        <Link href='/auth/forgot'>Forgot your password?</Link>
      </div>
    </>
  );
}
