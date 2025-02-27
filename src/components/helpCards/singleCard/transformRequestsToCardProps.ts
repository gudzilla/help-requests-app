import { HelpRequestData } from '@/lib/api/types';
import { RequestCardData } from './types';

export function transformRequestsToCardProps(
  requestsArray: HelpRequestData[]
): RequestCardData[] {
  return requestsArray.map((item) => ({
    id: item.id,
    title: item.title,
    organization: item.organization.title,
    goalDescription: item.goalDescription,
    endingDate: item.endingDate,
    locationDistrict: item.location.district,
    locationCity: item.location.city,
    isHelpOnline: item.helperRequirements.isOnline,
    requesterType: item.requesterType,
    helpType: item.helpType,
    contributorsCount: item.contributorsCount,
    requestGoal: item.requestGoal,
    requestGoalCurrentValue: item.requestGoalCurrentValue,
  }));
}
