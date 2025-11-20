import SignUpForm from '@/components/SignUpForm/SignUpForm';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <>
      <h1 className='auth_title'>Sign Up</h1>

      <SignUpForm />

      <div className='auth_footer'>
        <p>Already have an account?</p>
        <Link href='/auth/signin'>Sign In</Link>
      </div>
    </>
  );
}
