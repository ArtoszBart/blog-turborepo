import { getPaginatorDisplayArray } from '@/lib/pagination';
import { IClientPaginator } from '../Paginator';

export default function ClientPaginator(props: IClientPaginator) {
  const pageNumbers = getPaginatorDisplayArray({
    currentPage: props.currentPage,
    totalItems: props.totalItems,
    pageSize: props.pageSize,
  });

  return (
    <>
      {pageNumbers.map((page, idx) =>
        typeof page === 'number' ? (
          <button
            key={idx}
            className={
              'paginator_item' + (props.currentPage === page ? ' active' : '')
            }
            onClick={() => props.setPage(page)}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className='paginator_ellipsis'>
            ...
          </span>
        )
      )}
    </>
  );
}
