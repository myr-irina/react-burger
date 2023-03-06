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

  if (isAuthChecked && !user && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else if (user && onlyUnAuth) {
    return <Navigate to={location?.state?.from || '/'} />;
  } else if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else {
    return children;
  }
};
