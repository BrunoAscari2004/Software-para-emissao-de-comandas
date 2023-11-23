import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router-dom';
import Login from '@pages/nl/NlLogin/index';
import NlHeader from '@shared/components/NlHeader/NlHeader';
import { IRootState } from '@shared/store';
import { getLoggedUser, logout } from '@shared/store/modules/auth/authSlice';
import { apiEventEmitter } from '@shared/services/api';

const NlAuthentication: React.FC = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const isLoading = useSelector<IRootState, boolean>(app => app.auth.isLoading);
  const isAuthenticated = useSelector<IRootState, boolean>(app => app.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    apiEventEmitter.on('invalid_token', () => {
      // Ocorreu um 401 - Token expirou ou outro motivo
      dispatch(logout());
    });
    dispatch(getLoggedUser());
  }, []);

  if (isLoading) {
    return (
      <>
        <NlHeader />
        <div className="w-screen py-10 flex items-center justify-center">
          <CircularProgress color="primary" />
        </div>
      </>
    );
  } else if (isAuthenticated) {
    if (location.pathname === '/') {
      history.push('/home');
    }
    return <> {children} </>;
  } else {
    return <Route path="/" component={Login} />;
  }
};

export default NlAuthentication;
