// RequestCard.propTypes = {
//   view: pt.oneOf(['large', 'small']),
// };

type HelpCardProps = {
  dataForCardView: {
    id: string;
    title: string;
    // organization.title
    organization: string;
    goalDescription: string;
    endingDate: string;
    // location.district
    locationDistrict: string;
    // location.city
    locationCity: string;
    requesterType: 'person' | 'organization';
    helpType: 'finance' | 'material';
    contributorsCount: number;
    requestGoal: number;
    requestGoalCurrentValue: number;
  };
};
