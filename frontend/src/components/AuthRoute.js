import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const checkAuth = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated && !checkAuth) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default AuthRoute;
