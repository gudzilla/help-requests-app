import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthSelector } from '@/store/selectors';

type ProtectedRouteProps = {
  element: ReactElement;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  // todo: add state
  const isAuthenticated = useIsAuthSelector();

  return isAuthenticated ? element : <Navigate to="/login" replace={true} />;
};
