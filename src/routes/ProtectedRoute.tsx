import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthSelector } from '@/store/selectors';

type ProtectedRouteProps = {
  element: ReactElement;
  isLoginPage?: boolean;
};

export const ProtectedRoute = ({ element, isLoginPage = false }: ProtectedRouteProps) => {
  const isAuthenticated = useIsAuthSelector();

  if (!isAuthenticated && !isLoginPage) {
    return <Navigate to="/login" replace={true} />;
  }

  if (isAuthenticated && isLoginPage) {
    return <Navigate to="/help-catalog" replace={true} />;
  }

  return element;
};
