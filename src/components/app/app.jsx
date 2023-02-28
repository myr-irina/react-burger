import React, { useEffect } from 'react';
import {
  ForgotPassword,
  Ingredient,
  Login,
  Main,
  Profile,
  Register,
  ResetPassword,
  NotFound,
  HomePage,
  OrderHistory,
} from '../../pages';
import { Routes, Route } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

import { useDispatch } from 'react-redux';
import { ProtectedRoute } from '../protected-routes/protected-routes';
import { fetchIngredients } from '../../services/actions/ingredients';
import { checkUserAuth } from '../../services/actions/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <div className={styles.app}>
        <Routes>
          <Route index path="/" element={<Main />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/ingredients/:ingredientId"
            element={<Ingredient />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
