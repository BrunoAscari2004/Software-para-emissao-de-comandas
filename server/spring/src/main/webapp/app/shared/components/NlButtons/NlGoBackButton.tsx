import { Box, IconButton, makeStyles, Theme, withStyles } from '@material-ui/core';
import React from 'react';
import { IoIosUndo } from 'react-icons/io';

interface NlGoBackButtonProps {
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

const NlGoBackButton: React.FC<NlGoBackButtonProps> = ({ onClick, disabled }) => {
  const styles = useStyles();

  return (
    <Box
      boxShadow="0 1px 3px 0 rgb(0 0 0 / 33%)"
      width={50}
      height={50}
      borderRadius="50%"
      bgcolor="#ebebeb"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={0}
      className={styles.shadowHover}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        filter: disabled ? 'grayscale(0.2)' : 'none',
        opacity: disabled ? 0.75 : 1,
      }}
    >
      <StyledIconButton onClick={onClick}>
        <IoIosUndo size={20} color="#313534" />
      </StyledIconButton>
    </Box>
  );
};

export default NlGoBackButton;
