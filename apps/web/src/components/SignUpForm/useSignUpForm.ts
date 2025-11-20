import { validatePassword } from '@/lib/zod/schemas/signUpForm';
import { useState } from 'react';

const useSignUpForm = () => {
  const allPasswordMessages = validatePassword('');
  const [passwordErrors, setPasswordErrors] = useState(allPasswordMessages);

  const onPasswordChange = (password: string) => {
    setPasswordErrors(validatePassword(password));
  };

  return { onPasswordChange, allPasswordMessages, passwordErrors };
};

export default useSignUpForm;
