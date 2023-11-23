import { Box, Typography } from '@material-ui/core';
import React from 'react';
import NlHeader from '@shared/components/NlHeader/NlHeader';

const NlDeniedAccess: React.FC = () => (
  <>
    <NlHeader />
    <Box className="flex px-2 py-5 flex-col items-center">
      <Box className="flex mb-3 px-5 py-2 items-center justify-center bg-red-600 rounded-md">
        <Typography className="text-white">Acesso negado!</Typography>
      </Box>
      <Typography style={{ color: '#828282' }}>Você não tem permissão para acessar essa página</Typography>
    </Box>
  </>
);

export default NlDeniedAccess;
