import React from 'react';
import { useTheme } from '@material-ui/core';

interface NlPageTitleProps {
  className?: string;
}

const NlPageTitle: React.FC<NlPageTitleProps> = ({ children, className }) => {
  const theme = useTheme();

  return (
    <h1 style={{ color: theme.palette.primary.main }} className={`text-2xl mb-3 ${className ?? ''}`}>
      {children}
    </h1>
  );
};

export default NlPageTitle;
