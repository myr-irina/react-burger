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
import styles from './styles.module.scss';

import { useDispatch } from '../../services/hooks';
import { ProtectedRoute } from '../protected-routes/protected-routes';
import { fetchIngredients } from '../../services/actions/ingredients';
import { checkUserAuth } from '../../services/actions/user';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import FeedOrderDetails from '../feed-order-details/feed-order-details';
import ProfileLayout from '../../pages/profile-layout/profile-layout';
import ProfileOrders from '../profile-orders/profile-orders';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
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
          </Route>

          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile/orders/:id'
            element={
              <ProtectedRoute onlyUnAuth={false}>
                <FeedOrderDetails />
              </ProtectedRoute>
            }
          />

          <Route path='/feed'>
            <Route path='' element={<Feed />} />

            <Route
              path=':id'
              element={
                <div className={styles.feed_wrapper}>
                  <FeedOrderDetails />
                </div>
              }
            />
          </Route>

          <Route path='/ingredients/:id' element={<Ingredient />} />

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

            <Route
              path='/feed/:id'
              element={
                <div>
                  <Modal title='' handleClose={handleCloseModal}>
                    <FeedOrderDetails />
                  </Modal>
                </div>
              }
            />
            <Route
              path='/profile/orders/:id'
              element={
                <div>
                  <Modal title='' handleClose={handleCloseModal}>
                    <FeedOrderDetails />
                  </Modal>
                </div>
              }
            />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
