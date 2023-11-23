import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';

interface NlLoadingOverlayProps {
  open: boolean;
}

const NlLoadingOverlay: React.FC<NlLoadingOverlayProps> = ({ open }) => (
  <Box
    display={open ? 'flex' : 'none'}
    position="fixed"
    top="0"
    right="0"
    left="0"
    bottom="0"
    zIndex="100000001" // ARRUMAR
    alignItems="center"
    justifyContent="center"
    bgcolor="rgba(50,50,50,0.3)"
  >
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="15px"
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 33%)"
      borderRadius="10px"
      bgcolor="#fff"
    >
      <CircularProgress color="primary" />
    </Box>
  </Box>
);

export default NlLoadingOverlay;
