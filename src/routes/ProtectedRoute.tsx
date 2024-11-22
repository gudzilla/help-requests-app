import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  element: ReactElement;
};

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  // todo: add state
  const isAuthorized = false;

  return isAuthorized ? element : <Navigate to="/login" replace={true} />;
};
