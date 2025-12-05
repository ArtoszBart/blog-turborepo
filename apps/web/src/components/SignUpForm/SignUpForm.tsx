'use client';

import { signUp } from '@/lib/actions/authActions';
import { SignUpFormDTO, SignUpFormSchema } from '@/lib/zod/schemas/signUpForm';
import { FaCheck } from 'react-icons/fa6';
import { RxDotFilled } from 'react-icons/rx';
import Form, { Input } from '../common/Form';
import useSignUpForm from './useSignUpForm';

export default function SignUpForm() {
  const { onPasswordChange, allPasswordMessages, passwordErrors } =
    useSignUpForm();

  return (
    <Form<SignUpFormDTO>
      schema={SignUpFormSchema}
      onSubmit={signUp}
      submitLabel='Sign Up'
    >
      <Input label='Name' name='name' placeholder='John Doe' />
      <Input label='Email' name='email' placeholder='john@example.com' />
      <Input
        label='Password'
        name='password'
        type='password'
        serverErrorsOnly
        onChange={onPasswordChange}
      />

      <div className='auth-form_password-info'>
        <span>Password must:</span>
        <ul>
          {allPasswordMessages.map((message, idx) => {
            const isValid = !passwordErrors?.includes(message);

            return (
              <li key={idx} className={isValid ? 'valid' : ''}>
                {isValid && <FaCheck />}
                {!isValid && <RxDotFilled />}
                {message}
              </li>
            );
          })}
        </ul>
      </div>
    </Form>
  );
}
