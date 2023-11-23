import { ThemeProvider } from '@material-ui/styles';
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import theme from './NLTheme';
import Routes from './routes';
import store from './shared/store';
import './shared/style/tailwind.css';

function App() {
  return (
    <>
      <Toaster />
      <CookiesProvider>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </ReduxProvider>
      </CookiesProvider>
    </>
  );
}

export default App;
