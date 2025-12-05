'use client';

import { signIn } from '@/lib/actions/authActions';
import { SignInFormSchema } from '@/lib/zod/schemas/signInForm';
import type { SignInReqDTO } from '@blog-turborepo/types';
import Form, { Input } from '../common/Form';

export default function SignInForm() {
  return (
    <Form<SignInReqDTO>
      schema={SignInFormSchema}
      onSubmit={signIn}
      submitLabel='Sign In'
    >
      <Input label='Email' name='email' placeholder='john@example.com' />
      <Input label='Password' name='password' type='password' />
    </Form>
  );
}
