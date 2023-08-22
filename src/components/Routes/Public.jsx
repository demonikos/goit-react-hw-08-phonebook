import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoggin, getRefreshing } from 'redux/selectors';

export const Public = ({ component: Component, redirectTo = '/' }) => {
  const isLogIn = useSelector(getLoggin);
  const isRefresh = useSelector(getRefreshing);
  const isRedirect = !isLogIn && !isRefresh;
  return isRedirect ? <Component /> : <Navigate to={redirectTo} />;
};

Public.propTypes = {
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
};
