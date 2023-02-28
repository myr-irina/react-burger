import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import Preloader from '../preloader/preloader';

export const ProtectedRoute = ({ onlyUnAuth, children }) => {
  const isAuthChecked = useSelector(state => state.auth.isAuthChecked);
  const user = useSelector(state => state.auth.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (isAuthChecked && !user && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else if (isAuthChecked && user && onlyUnAuth) {
    return <Navigate to="/" state={{ from: location }} replace="true" />;
  } else {
    return children;
  }
};
