import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';

const PrivateRoute: React.FC = ({ comp: Component, ...rest }): JSX.Element => {
  const { loading, currentUser } = useAuth();
  if ( currentUser )
    console.log( "User logged in: ", currentUser.email )

  console.log( Component )

  return (
    <Route {...rest} render={ props => {
      return currentUser? <Component {...props}/> : <Redirect to="/"/>
    }}>
    </Route>
  )
}

export default PrivateRoute;
