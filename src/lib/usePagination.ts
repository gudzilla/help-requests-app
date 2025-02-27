type UsePaginationReturnType<T> = {
  totalPages: number;
  itemsForPage: T[];
};

export const usePagination = <T>(
  itemsArray: T[],
  itemsPerPage: number,
  pageNumber: number
): UsePaginationReturnType<T> => {
  const indexOfLastItem = pageNumber * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const itemsForPage = itemsArray.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(itemsArray.length / itemsPerPage);

  return { totalPages, itemsForPage };
};
