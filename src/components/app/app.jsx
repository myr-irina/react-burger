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
import { getUserData } from '../../services/actions/user';
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/profile/orders" element={<OrderHistory />} />
          <Route path="/profile/orders/:id" element={<HomePage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
