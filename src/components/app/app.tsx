import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import Modal from '../modal/modal';

import { OrderInfo } from '../order-info/order-info';

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
    //@ts-ignore
    dispatch(getIngredients())
    //@ts-ignore
    dispatch(getUserInfo())
  }, [dispatch]);

  return (
    <>
        <AppHeader />
        <div className={styles.main}>
          <Switch>
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
            <ProtectedRoute path='/profile/'>
              <Profile />
            </ProtectedRoute>
            { background && <Route path='/ingredients/:id'>
              <Modal onClose={ingredientModalClose} title={'Детали ингредиента'}> 
                  < IngredientDetails/>
              </Modal>
            </Route>}
            { location && <Route path='/ingredients/:id'>
                < IngredientDetails/>
            </Route>}
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </div>
    </>
  );
}

export default App;
