import SignInForm from '@/components/SignInForm/SignInForm';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignInPage() {
  return (
    <>
      <h1 className='auth_title'>Sign In</h1>

      <SignInForm />

      <div className='auth_footer'>
        <Link href='/auth/forgot'>Forgot your password?</Link>
        <div>
          <p>Don&apos;t have an account?</p>
          <Link href='/auth/signup'>Sign Up</Link>
        </div>

        <div className='auth_footer_separator'>
          <hr />
          <span>or</span>
          <hr />
        </div>

        <div className='auth_footer_socials'>
          <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`}>
            <FcGoogle />
          </a>
        </div>
      </div>
    </>
  );
}
