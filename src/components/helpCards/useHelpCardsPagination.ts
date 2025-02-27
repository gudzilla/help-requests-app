import { transformRequestsToCardProps } from './singleCard';
import { HelpRequest } from '@/lib/api/types';
import { usePagination } from '@/lib/usePagination';

export const useHelpCardsPagination = (
  requests: HelpRequest[],
  itemsPerPage: number,
  currentPage: number
) => {
  const { pageItems, totalPages } = usePagination(requests, itemsPerPage, currentPage);
  const helpCardsData = transformRequestsToCardProps(pageItems);

  return { helpCardsData, totalPages };
};
