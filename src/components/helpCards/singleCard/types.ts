export type RequestCardData = {
  id: string;
  title: string;
  organization: string;
  goalDescription: string;
  endingDate: string;
  locationDistrict: string;
  locationCity: string;
  isHelpOnline: boolean;
  requesterType: 'person' | 'organization';
  helpType: 'finance' | 'material';
  contributorsCount: number;
  requestGoal: number;
  requestGoalCurrentValue: number;
};

export type CardRequesterType = RequestCardData['requesterType'];
export type CardHelpType = RequestCardData['helpType'];
