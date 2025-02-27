import CardImage1 from '@/assets/card-image-1.svg?react';
import CardImage2 from '@/assets/card-image-2.svg?react';
import CardImage3 from '@/assets/card-image-3.svg?react';
import { CardRequesterType, CardHelpType } from './types';

type HelpRequestImageProps = {
  requesterType: CardRequesterType;
  helpType: CardHelpType;
};

export const HelpRequestImage = ({ requesterType, helpType }: HelpRequestImageProps) => {
  if (requesterType === 'organization') {
    return <CardImage2 />;
  } else if (helpType === 'finance') {
    return <CardImage1 />;
  } else {
    return <CardImage3 />;
  }
};
