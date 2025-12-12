export interface IPaginator {
  totalItems: number;
  currentPage: number;
  pageSize: number;
}

export interface IClientPaginator extends IPaginator {
  setPage: (page: number) => void;
}
