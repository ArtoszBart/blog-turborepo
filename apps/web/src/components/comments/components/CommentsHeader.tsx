import SubmitButton from '@/components/common/Form/components/SubmitButton/SubmitButton';
import Link from 'next/link';

interface IProps {
  isUserAuth: boolean;
  isFormVisible: boolean;
  isSubmitting: boolean;
  commentsCount: number;
  showForm: () => void;
  hideForm: () => void;
}

export default function CommentsHeader(props: IProps) {
  return (
    <div className='comments_header'>
      <h2>Comments ({props.commentsCount})</h2>
      {props.isUserAuth ? (
        <div className='comments_header_buttons'>
          <button
            className={
              'button' + (!props.isFormVisible ? ' visible' : ' hidden')
            }
            onClick={props.showForm}
          >
            Add Comment
          </button>

          <div
            className={
              'comments_header_buttons_layer' +
              (props.isFormVisible ? ' visible' : ' hidden')
            }
          >
            <SubmitButton
              className={'button'}
              form='comment-form'
              isSubmitting={props.isSubmitting}
            >
              Submit
            </SubmitButton>

            <button className={'button-2'} onClick={props.hideForm}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <span>
          <Link href='/auth/signin'>Sign in</Link> to leave a comment
        </span>
      )}
    </div>
  );
}
