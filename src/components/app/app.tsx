import React, { useEffect } from 'react';
import { useDispatch } from '../../hooks/hooks'; 
import { getIngredients } from '../../services/actions/ingrediens';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import { HomePage, Login, Register, ForgotPassword, ResetPassword, Profile, Page404, Feed } from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserInfo } from '../../services/actions/user'
import { resetCurrentIngredient } from '../../services/actions/current-ingredient';

import { useHistory, useLocation, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Location } from 'history'; 

import IngredientDetails from '../ingredient-details/ingredient-details';
import { OrderInfo } from '../order-info/order-info';
import Modal from '../modal/modal';


function App() {
  const dispatch = useDispatch();

  const location = useLocation<{background: Location}>();
  const background = location.state && location.state.background;

  const history = useHistory();

  const ingredientModalClose = () => {
    dispatch(resetCurrentIngredient())
    history.goBack();
  }

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUserInfo())
  }, [dispatch]);

  return (
    <>
        <AppHeader />
        <div className={styles.main}>
          <Switch location={background || location}>
            <Route path='/orderinfo' exact={true}>
              <OrderInfo/>
            </Route>
            <Route path='/' exact={true}>
              <HomePage/>
            </Route>
            <Route path='/feed' exact={true}>
              <Feed />
            </Route>
            <Route path='/login' exact={true}>
              <Login />
            </Route>
            <Route path='/register' exact={true}>
              <Register />
            </Route>
            <Route path='/forgot-password' exact={true}>
              <ForgotPassword />
            </Route>
            <Route path='/reset-password' exact={true}>
              <ResetPassword />
            </Route>
            <ProtectedRoute path='/profile/' exact={true}>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path='/profile/orders' exact={true}>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path='/profile/orders/:id' exact={true}>
              < OrderInfo/>
            </ProtectedRoute>
            <Route path='/ingredients/:id' exact={true}>
                < IngredientDetails/>
            </Route>
            <Route path='/feed/:id' exact={true}>
                < OrderInfo/>
            </Route>
            <Route>
              <Page404 />
            </Route>
          </Switch>
          { background && (
            <>
              <Route path='/ingredients/:id'>
              <Modal onClose={ingredientModalClose} title={'Детали ингредиента'}> 
                  < IngredientDetails/>
              </Modal>
              </Route>

              <Route path='/feed/:id'>
                <Modal onClose={ingredientModalClose}> 
                    < OrderInfo/>
                </Modal>
              </Route>

              <ProtectedRoute path='/profile/orders/:id' exact={true}>
                <Modal onClose={ingredientModalClose}> 
                    < OrderInfo/>
                </Modal>
              </ProtectedRoute>
              
            </>
          )}
        </div>
    </>
  );
}

export default App;
