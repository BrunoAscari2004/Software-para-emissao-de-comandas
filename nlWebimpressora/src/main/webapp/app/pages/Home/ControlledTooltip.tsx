import { Tooltip, TooltipProps } from '@mui/material';
import React from 'react';

interface IControlledInputProps extends TooltipProps {
  disabled?: boolean;
}

export const ControlledInput: React.FC<IControlledInputProps> = ({ disabled, children, ...props }) => {
  if (disabled) return <>{children}</>;
  return <Tooltip {...props}>{children}</Tooltip>;
};
