import { ACTIVE_PAGE_NEIGHBORS } from './consts/consts';
import { IPaginator } from './types/IPaginator';

export const getPaginatorDisplayArray = (props: IPaginator) => {
  const totalPages = Math.ceil(props.totalItems / props.pageSize);
  const safeCurrentPage = Math.min(
    Math.max(props.currentPage || 1, 1),
    totalPages
  );

  if (totalPages <= 2 * ACTIVE_PAGE_NEIGHBORS + 5) {
    return range(1, totalPages);
  }

  const startPage = Math.max(2, safeCurrentPage - ACTIVE_PAGE_NEIGHBORS);
  const endPage = Math.min(
    totalPages - 1,
    safeCurrentPage + ACTIVE_PAGE_NEIGHBORS
  );

  let pages: (number | string)[] = range(startPage, endPage);

  if (startPage > 2) pages = ['...', ...pages];
  if (endPage < totalPages - 1) pages = [...pages, '...'];

  return [1, ...pages, totalPages];
};

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);
