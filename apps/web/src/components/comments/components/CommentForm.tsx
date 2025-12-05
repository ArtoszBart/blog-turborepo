import { Input } from '@/components/common/Form';
import { IuseFormReturn } from '@/components/common/Form/useForm';
import { FormProvider } from 'react-hook-form';

interface IProps {
  postId: number;
  hook: IuseFormReturn;
  isVisible: boolean;
}

export default function CommentForm({ postId, hook, isVisible }: IProps) {
  return (
    <div className={'comments_form' + (isVisible ? ' visible' : '')}>
      <FormProvider {...hook.formProps}>
        <form
          className='form'
          id='comment-form'
          action={hook.action}
          noValidate
        >
          <input name='postId' type='number' defaultValue={postId} hidden />
          <Input name='content' placeholder='Leave a comment...' multiline />

          <span className={`form_error-message`}>
            {hook.serverErrorMessage}
          </span>
        </form>
      </FormProvider>
    </div>
  );
}
