import { DEFAULT_PAGE_SIZE } from '@/lib/pagination/consts';

const toNumberOrUndefined = (value?: string) => {
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
};

export const transformTakeSkip = ({
  page,
  pageSize,
}: {
  page?: string;
  pageSize?: string;
}) => {
  const pageInt = toNumberOrUndefined(page) ?? 1;
  const pageSizeInt = toNumberOrUndefined(pageSize) ?? DEFAULT_PAGE_SIZE;

  return {
    skip: (pageInt - 1) * pageSizeInt,
    take: pageSizeInt,
  };
};
