import { HelpRequest } from '@/lib/api/types';

export type HelperRequirementsType = HelpRequest['helperRequirements'];

export type HelpRequestFiltersType = {
  helpType: HelpRequest['helpType'] | null;
  requesterType: HelpRequest['requesterType'] | null;
  helperRequirements: {
    helperType: HelperRequirementsType['helperType'] | null;
    isOnline: HelperRequirementsType['isOnline'] | null;
    qualification: HelperRequirementsType['qualification'] | null;
  };
  helpDate: string | null;
  searchQuery: string;
};

export type HelperRequirementsFilterType = HelpRequestFiltersType['helperRequirements'];
