import React, { Component } from 'react';
import { Redirect, Route } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';

export interface IPrivateRoute {
  exact: boolean;
  comp: () => JSX.Element;
  path: string;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ comp: Component, ...rest }): JSX.Element => {
  const { loading, currentUser } = useAuth();
  if ( currentUser )
    console.log( "User logged in: ", currentUser.email, " typof", typeof currentUser )

  return (
    <Route {...rest} render={ props => {
      return currentUser? React.createElement(Component, props) : <Redirect to="/"/>
    }}>
    </Route>
  )
}

export default PrivateRoute;
