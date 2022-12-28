import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingrediens';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import { HomePage, Login, Register, ForgotPassword, ResetPassword, Profile, Page404 } from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserInfo } from '../../services/actions/user'
import { resetCurrentIngredient } from '../../services/actions/current-ingredient';

import { useHistory, useLocation, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

function App() {
  const dispatch = useDispatch ();

  const location = useLocation();
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
          <Switch>
            <Route path='/' exact={true}>
              <HomePage/>
            </Route>
            <Route path='/orders' exact={true}>
              <div>'sdfsdfsdf'</div>
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
            <ProtectedRoute path='/profile' exact={true}>
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
