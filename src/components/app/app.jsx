import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingrediens';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import { HomePage, Login, Register, ForgotPassword, ResetPassword, Profile, Page404 } from '../../pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserInfo } from '../../services/actions/user'

import { useLocation, BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
  const dispatch = useDispatch ();




  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getUserInfo())
  }, [dispatch]);

  return (
    <Router>
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
            <Route path='/ingredients/:id'>
                <IngredientDetails />
            </Route>
            <Route>
              <Page404 />
            </Route>
        </Switch>
        </div>
    </Router>
  );
}

export default App;
