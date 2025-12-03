import Skeleton from '@/components/common/Skeleton';

export default function CommentCardSkeleton() {
  return (
    <div className='comments_card'>
      <div className='comments_card_header'>
        <Skeleton width='2.5rem' height='2.5rem' circle />
        <div className='comments_card_header_meta'>
          <Skeleton width='8rem' />
          <Skeleton width='4rem' containerClassName='date' />
        </div>
      </div>
      <Skeleton width='70%' containerClassName='comments_card_content' />
    </div>
  );
}
