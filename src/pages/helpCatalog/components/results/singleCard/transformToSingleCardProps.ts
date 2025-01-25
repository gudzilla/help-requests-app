import { HelpRequestData } from '@/lib/api/types';
import { DataForSingleCard } from './SingleCard';

function transformToSingleCardProps(helpRequest: HelpRequestData): DataForSingleCard {
  return {
    id: helpRequest.id,
    title: helpRequest.title || '',
    organization: helpRequest.organization?.title || '',
    goalDescription: helpRequest.goalDescription || '',
    endingDate: helpRequest.endingDate || '',
    locationDistrict: helpRequest.location?.district || '',
    locationCity: helpRequest.location?.city || '',
    isHelpOnline: helpRequest.helperRequirements?.isOnline || false,
    requesterType: helpRequest.requesterType || 'person' || 'organization',
    helpType: helpRequest.helpType || 'finance' || 'material',
    contributorsCount: helpRequest.contributorsCount || 0,
    requestGoal: helpRequest.requestGoal || 0,
    requestGoalCurrentValue: helpRequest.requestGoalCurrentValue || 0,
  };
}

export function transformDataForCardsView(
  requestsArray: HelpRequestData[]
): DataForSingleCard[] {
  const preparedArray = [];
  for (let request of requestsArray) {
    preparedArray.push(transformToSingleCardProps(request));
  }

  return preparedArray;
}
