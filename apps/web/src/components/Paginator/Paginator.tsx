import { getPaginatorDisplayArray } from '@/lib/pagination/';
import Link from 'next/link';
import './paginator.scss';

interface IProps {
  totalItems: number;
  currentPage: number;
}

export default function Paginator({ currentPage, totalItems }: IProps) {
  const pageNumbers = getPaginatorDisplayArray({
    currentPage,
    totalItems,
  });

  return (
    <div className='paginator'>
      {pageNumbers.map((page, idx) =>
        page !== '...' ? (
          <Link
            key={idx}
            className={
              'paginator_item' + (currentPage === page ? ' active' : '')
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
    </div>
  );
}
