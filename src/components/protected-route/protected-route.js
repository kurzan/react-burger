import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from 'react-router-dom';
import { getUserInfo } from '../../services/actions/user';

export const ProtectedRoute = ({ children, ...rest  }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.userReducer);

  return (
    <Route
      {...rest}
      render={({location}) => 
        user ? (
          children
        ) : (
          <Redirect to={{pathname: '/login', state: {from: location}}} />
        )
      }
    />
  )
};  