import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingrediens';
import styles from './app.module.css'
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home/home';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch ();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  return (
      <Router>
        <AppHeader />
        <Switch>
          <div className={styles.main}>
          <Route path='/' exact={true}>
              <HomePage/>
          </Route>
          <Route path='/lenta' exact={true}>
              <div>'sdfsdfsdf'</div>
          </Route>
          <Route path='/login' exact={true}>
              'Логин'
          </Route>
          <Route path='/register' exact={true}>
              'register'
          </Route>
          <Route path='/forgot-password' exact={true}>
              'forgot-password'
          </Route>
          <Route path='/reset-password' exact={true}>
              'reset-password '
          </Route>
          <Route path='/profile' exact={true}>
              'profile  '
          </Route>
          <Route path='/ingredients/:id' exact={true}>
              'profile'
          </Route>
           </div>
        </Switch>
      </Router>
  );
}

export default App;
