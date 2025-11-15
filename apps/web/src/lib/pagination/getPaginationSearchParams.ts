import { DEFAULT_PAGE_SIZE } from './consts/consts';
import { PaginationSearchParams } from './types/PaginationSearchParams';

export const getPaginationSearchParams = async (
  searchParams: PaginationSearchParams
) => {
  const { page, pageSize } = await searchParams;
  const safePage = paramsSafeParse(page) ?? 1;
  const safePageSize = paramsSafeParse(pageSize) ?? DEFAULT_PAGE_SIZE;

  return {
    page: safePage,
    pageSize: safePageSize,
  };
};

const paramsSafeParse = (value?: string | number) => {
  const num = Number(value);
  return Number.isNaN(num) ? undefined : Math.max(num, 1);
};
