import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { checkUserAuth } from '../../services/actions/user';

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(state => state.auth.isAuthChecked);
  const user = useSelector(state => state.auth.user);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (!isAuthChecked) {
    return 'Loaded...';
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};
