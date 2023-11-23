import { IconButton, useTheme } from '@material-ui/core';
import React from 'react';
import { FiPower } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NlLogo from '@shared/assets/header_logo_nl.png';
import { logout } from '@shared/store/modules/auth/authSlice';
import './home.scss';

const Home: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="absolute right-5 top-5">
        <IconButton onClick={handleLogout}>
          <FiPower color="#fff" size={22.5} />
        </IconButton>
      </div>
      <div
        className="flex justify-center w-screen h-screen items-center gap-y-3 p-5 flex-col"
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <div className="flex gap-x-3 items-center justify-center">
          <div>
            <div className="flex w-full justify-end">
              <img src={NlLogo} alt="NL" />
            </div>
            <h1 className="text-white">Tecnologia feita por pessoas</h1>
          </div>
          <div className="separator">
            <div className="flex flex-1 ml-3">
              <h3 className="text-white">Bem vindo</h3>
            </div>
          </div>
        </div>

        <div className="flex gap-x-6 mt-6">
          <div className="flex gap-5">
            <div
              onClick={() => history.push('/listNlBaseUsuarios')}
              className="flex align-center justify-center text-nl py-2 px-4 bg-white rounded-sm font-medium hover:darken transition-filter cursor-pointer shadow-lg transition-shadow"
            >
              Usuarios
            </div>
          </div>
          <div className="flex gap-5">
            <div
              onClick={() => history.push('/nlApresentacao')}
              className="flex align-center justify-center text-nl py-2 px-4 bg-white rounded-sm font-medium hover:darken transition-filter cursor-pointer shadow-lg transition-shadow"
            >
              Apresentação
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
