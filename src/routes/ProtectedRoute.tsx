import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthSelector } from '@/store/selectors';

type ProtectedRouteProps = {
  element: ReactElement;
  when?: 'login' | 'other';
};

export const ProtectedRoute = ({ element, when = 'other' }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthSelector();

  if (!isAuthenticated && when === 'other') {
    return <Navigate to="/login" replace={true} />;
  }

  if (isAuthenticated && when === 'login') {
    return <Navigate to="/help-catalog" replace={true} />;
  }

  return element;
};
