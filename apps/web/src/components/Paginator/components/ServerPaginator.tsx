import { getPaginatorDisplayArray } from '@/lib/pagination/';
import { IPaginator } from '@/lib/pagination/types/IPaginator';
import Link from 'next/link';

export default function ServerPaginator(props: IPaginator) {
  const pageNumbers = getPaginatorDisplayArray(props);

  return (
    <>
      {pageNumbers.map((page, idx) =>
        page !== '...' ? (
          <Link
            key={idx}
            className={
              'paginator_item' + (props.currentPage === page ? ' active' : '')
            }
            href={`?page=${page}`}
          >
            {page}
          </Link>
        ) : (
          <span key={idx} className='paginator_ellipsis'>
            ...
          </span>
        )
      )}
    </>
  );
}
