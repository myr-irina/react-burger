import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import Preloader from '../preloader/preloader';

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const isAuthChecked = useSelector(state => state.auth.isAuthChecked);
  const user = useSelector(state => state.auth.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={location?.state?.from || '/'} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
