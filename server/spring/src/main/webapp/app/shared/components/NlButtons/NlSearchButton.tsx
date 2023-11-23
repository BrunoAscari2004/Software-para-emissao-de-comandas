import { Box, IconButton, makeStyles, Theme, useTheme, withStyles } from '@material-ui/core';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

// Props do IconButton do Material UI
interface NlSearchButtonProps {
  onClick?: () => void | Promise<void>;
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

const NlSearchButton: React.FC<NlSearchButtonProps> = ({ onClick, disabled, ...props }) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <Box
      position="absolute"
      right={16}
      bottom={20}
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
        filter: disabled ? 'grayscale(0.2)' : 'none',
      }}
    >
      <StyledIconButton type="submit" onClick={onClick}>
        <FaSearch color="#fff" size={17.5} className="m-0.5" />
      </StyledIconButton>
    </Box>
  );
};

export default NlSearchButton;
