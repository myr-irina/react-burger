import { useSelector } from '../../services/hooks';
import { useLocation, Navigate } from 'react-router-dom';
import Preloader from '../preloader/preloader';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={location?.state?.from || '/'} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <>{children}</>;
};
