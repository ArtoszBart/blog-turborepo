import Skeleton from '@/components/common/Skeleton';

export default function CommentCardSkeleton({ count }: { count: number }) {
  return Array.from({ length: count }).map((_, idx) => (
    <div className='comments_card' key={idx}>
      <div className='comments_card_header'>
        <Skeleton width='2.5rem' height='2.5rem' circle />
        <div className='comments_card_header_meta'>
          <Skeleton width='8rem' />
          <Skeleton width='4rem' containerClassName='date' />
        </div>
      </div>
      <Skeleton width='70%' containerClassName='comments_card_content' />
    </div>
  ));
}
