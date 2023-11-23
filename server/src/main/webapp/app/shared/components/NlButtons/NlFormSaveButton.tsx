import { Box, IconButton, makeStyles, Theme, useTheme, withStyles } from '@material-ui/core';
import React from 'react';
import { FiSave } from 'react-icons/fi';

interface NlFormSaveButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const StyledIconButton = withStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
}))(IconButton);

export const useStyles = makeStyles(theme => ({
  shadowHover: {
    transition: 'box-shadow 0.2s',
    '&:hover': {
      boxShadow: '0 8px 14px 0 rgb(0 0 0 / 38%)',
    },
  },
}));

const NlFormSaveButton: React.FC<NlFormSaveButtonProps> = ({ onClick, disabled }) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <Box
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 33%)"
      width={50}
      height={50}
      borderRadius="50%"
      bgcolor={theme.palette.primary.main}
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={0}
      className={styles.shadowHover}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        filter: disabled ? 'grayscale(0.3)' : 'none',
        opacity: disabled ? 0.75 : 1,
      }}
    >
      <StyledIconButton type="submit" onClick={onClick} disabled={disabled}>
        <FiSave size={20} color="#fff" />
      </StyledIconButton>
    </Box>
  );
};

export default NlFormSaveButton;
