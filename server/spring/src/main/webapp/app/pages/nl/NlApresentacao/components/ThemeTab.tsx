import {
  Button,
  Checkbox,
  createTheme,
  IconButton,
  Radio,
  TextField,
  ThemeProvider,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { FiSearch, FiUser, FiX } from 'react-icons/fi';
import { v4 } from 'uuid';
import Lov from '@shared/components/NlLov';
import NlPageTitle from '@shared/components/NlPageTitle';
import muiTheme from './data/theme';

const ThemeItem = () => {
  const theme = useTheme();

  return (
    <div className="flex flex-col items-center gap-y-2">
      <div>
        <Button color="primary" variant="contained">
          Botão
        </Button>
      </div>

      <Lov
        onAddOpen={() => {}}
        id={`lovTema${v4()}`}
        getData={() => {
          return [{ cod: 1, des: 'Exemplo' }];
        }}
      />

      <TextField color="primary" />

      <div className="flex gap-1">
        <Checkbox checked={true} color="primary" />
        <Radio checked={true} color="primary" />
      </div>

      <Typography color="primary">Texto exemplo</Typography>

      <div className="flex gap-1">
        <IconButton>
          <FiSearch style={{ color: theme.palette.primary.main }} />
        </IconButton>

        <IconButton>
          <FiX style={{ color: theme.palette.primary.main }} />
        </IconButton>

        <IconButton>
          <FiUser style={{ color: theme.palette.primary.main }} />
        </IconButton>
      </div>
    </div>
  );
};

const ThemeTab: React.FC = () => {
  return (
    <div>
      <NlPageTitle>Tema</NlPageTitle>

      <div className="flex w-full justify-start flex-col 2xl:flex-row gap-5 2xl:justify-around">
        {['#fc7422', '#f0f', '#3bb972'].map(color => (
          <ThemeProvider
            key={color}
            theme={createTheme({
              ...muiTheme,
              palette: {
                ...muiTheme.palette,
                primary: { main: color },
              },
            })}
          >
            <ThemeItem />
          </ThemeProvider>
        ))}
      </div>
    </div>
  );
};

export default ThemeTab;
