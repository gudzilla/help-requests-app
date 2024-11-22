import { ReactElement, ReactNode } from 'react';

type ShowOnlyProps = {
  when: 'authorized' | 'unauthorized';
  children: ReactElement;
  otherwise: ReactNode;
};

export const ShowOnly = ({ when, children, otherwise = null }: ShowOnlyProps) => {
  // todo: implement real auth state
  const isAuth = true;

  if (!isAuth && when === 'authorized') {
    return otherwise;
  }

  if (isAuth && when === 'unauthorized') {
    return otherwise;
  }

  return <>{children}</>;
};
