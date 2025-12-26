import { transformRequestsToCardProps } from './singleCard';
import { HelpRequest } from '@/lib/api/types';
import { usePagination } from '@/lib/usePagination';

type ParamsType = {
  requestsArr: HelpRequest[];
  itemsPerPage: number;
  currentPage: number;
};

export const useHelpCardsPagination = ({
  requestsArr,
  itemsPerPage,
  currentPage,
}: ParamsType) => {
  const { pageItems, totalPages } = usePagination(requestsArr, itemsPerPage, currentPage);
  const helpCardsData = transformRequestsToCardProps(pageItems);

  return { helpCardsData, totalPages };
};
