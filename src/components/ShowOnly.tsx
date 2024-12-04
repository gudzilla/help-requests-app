import { ReactElement, ReactNode } from 'react';
import { useIsAuthSelector } from '../store/selectors';

type ShowOnlyProps = {
  when: 'authorized' | 'unauthorized';
  children: ReactElement;
  otherwise: ReactNode;
};

export const ShowOnly = ({ when, children, otherwise = null }: ShowOnlyProps) => {
  // todo: implement real auth state
  const isAuthenticated = useIsAuthSelector();

  if (!isAuthenticated && when === 'authorized') {
    return otherwise;
  }

  if (isAuthenticated && when === 'unauthorized') {
    return otherwise;
  }

  return <>{children}</>;
};
