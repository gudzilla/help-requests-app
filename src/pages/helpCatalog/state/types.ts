import { HelpRequest } from '@/lib/api/types';

export type HelperRequirementsType = HelpRequest['helperRequirements'];

export type HelpRequestFiltersType = {
  helpType: HelpRequest['helpType'][];
  requesterType: HelpRequest['requesterType'][];
  helperRequirements: {
    qualification: HelperRequirementsType['qualification'][];
    helperType: HelperRequirementsType['helperType'][];
    isOnline: HelperRequirementsType['isOnline'] | null;
  };
  helpDate: string | null;
  searchQuery: string;
};

export type HelperRequirementsFilterType = HelpRequestFiltersType['helperRequirements'];
