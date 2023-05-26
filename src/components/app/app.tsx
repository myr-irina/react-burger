import React, { useCallback, useEffect } from 'react';
import {
  ForgotPassword,
  Ingredient,
  Login,
  Main,
  Profile,
  Register,
  ResetPassword,
  NotFound,
  Feed,
} from '../../pages';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import styles from './app.module.css';

import { useDispatch } from 'react-redux';
import { ProtectedRoute } from '../protected-routes/protected-routes';
import { fetchIngredients } from '../../services/actions/ingredients';
import { checkUserAuth } from '../../services/actions/user';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import FeedOrderDetails from '../feed-order-details/feed-order-details';
import FeedOrder from '../feed-order';
import ProfileLayout from '../../pages/profile-layout/profile-layout';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  const navigate = useNavigate();

  const handleCloseModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {  
    dispatch(fetchIngredients());  
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <div className={styles.app}>
        <Routes location={background || location}>
          <Route path='/' element={<Main />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth={true}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route path='' element={<Profile />} />
            <Route path='orders' element={<FeedOrder />} />
          </Route>
          <Route
            path='/profile/orders/:id'
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <FeedOrderDetails />
              </ProtectedRoute>
            }
          />

          {background && (
            <Routes>
              <Route
                path='/orders/:id'
                element={
                  <Modal
                    title='Детали ингредиента'
                    handleClose={handleCloseModal}
                  >
                    <FeedOrderDetails />
                  </Modal>
                }
              />
            </Routes>
          )}

          <Route path='/ingredients/:id' element={<Ingredient />} />

          <Route path='/feed'>
            <Route path='' element={<Feed />} />
            <Route path=':id' element={<FeedOrderDetails />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title='Детали ингредиента'
                  handleClose={handleCloseModal}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
