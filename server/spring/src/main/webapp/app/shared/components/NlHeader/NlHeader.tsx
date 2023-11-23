import { useTheme } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { FiMenu, FiPower } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NlLogo from '../../assets/header_logo_nl.png';
import { IRootState } from '../../store';
import { logout } from '../../store/modules/auth/authSlice';
import './NlHeader.scss';

const NlHeader = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();
  const isAuthenticated = useSelector<IRootState, boolean>(state => state.auth.isAuthenticated);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <>
      <div className="header-underlay" />
      <header
        style={{
          background: theme.palette.primary.main,
        }}
        className="flex items-center justify-between header-container"
      >
        <div className="header-logo">
          {isAuthenticated && (
            <IconButton>
              <FiMenu color="#fff" size={22.5} />
            </IconButton>
          )}
          <img src={NlLogo} alt="NL" onClick={() => history.push('/home')} className="cursor-pointer" />
        </div>

        <div id="header-tabs">
          {isAuthenticated && (
            <IconButton onClick={handleLogout}>
              <FiPower color="#fff" size={22.5} />
            </IconButton>
          )}
        </div>
      </header>
    </>
  );
};

export default NlHeader;
