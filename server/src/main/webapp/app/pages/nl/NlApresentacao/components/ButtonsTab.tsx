import { Button, IconButton, useTheme } from '@material-ui/core';
import React from 'react';
import { FiSearch, FiUser, FiX } from 'react-icons/fi';
import NlPageTitle from '@shared/components/NlPageTitle';

const ButtonsTab: React.FC = () => {
  const theme = useTheme();

  return (
    <div className="flex flex-col gap-y-4">
      <NlPageTitle>Botões</NlPageTitle>

      <div className="flex w-full justify-center gap-x-4">
        <Button color="primary" variant="contained">
          Contained
        </Button>
        <Button color="primary" variant="outlined">
          Outlined
        </Button>
        <Button color="primary" variant="text">
          Text
        </Button>
      </div>

      <div className="flex w-full justify-center gap-x-6 mt-3">
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

export default ButtonsTab;
