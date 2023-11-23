import { IconButton, SwipeableDrawer, useTheme } from '@material-ui/core';
import React from 'react';
import { FaEraser, FaTimes } from 'react-icons/fa';
import NlPageTitle from '../NlPageTitle';

interface NlSearchSidebarProps {
  width?: number;
  open: boolean;
  onClose: () => void;
  onErase: () => void;
}

const NlSearchSidebar: React.FC<NlSearchSidebarProps> = ({
  open: aaOpen,
  onClose,
  onErase,
  width: minWidth = 400,
  children,
}) => {
  const theme = useTheme();

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    onClose();
  };

  return (
    <SwipeableDrawer anchor={'right'} open={aaOpen} onClose={onClose} onOpen={toggleDrawer()}>
      <div
        className="right-0 top-0 bottom-0 bg-white p-5"
        style={{
          zIndex: 210,
          minWidth,
        }}
      >
        <NlPageTitle className="mb-3">Pesquisar</NlPageTitle>
        <div className="h-4" />
        <hr />
        <div className="h-12" />
        {children}
      </div>

      <div className="bottom-0 w-full absolute bg-gray-200 flex pl-3 py-1 gap-x-2 border-t-2 border-gray-300">
        <IconButton size="small" onClick={onClose}>
          <FaTimes className="m-1" color={theme.palette.primary.main} size={15} />
        </IconButton>

        <IconButton size="small" onClick={onErase}>
          <FaEraser className="m-1" color={theme.palette.primary.main} size={15} />
        </IconButton>
      </div>
    </SwipeableDrawer>
  );
};

export default NlSearchSidebar;
