import { useSelector } from '../../hooks/hooks';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ children, ...rest  }: any) => {

  const { user } = useSelector((store) => store.userReducer);

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