import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const isAuthChecked = useSelector(state => state.auth.isAuthChecked);
  const user = useSelector(state => state.auth.user);
  const location = useLocation();
  console.log(onlyUnAuth);

  return (
    <>
      {!isAuthChecked && 'Loaded...'}

      {isAuthChecked && !user && onlyUnAuth && (
        <Navigate to="/login" state={{ from: location }} />
      )}
      {isAuthChecked && user && !onlyUnAuth && children}
    </>
  );
};
