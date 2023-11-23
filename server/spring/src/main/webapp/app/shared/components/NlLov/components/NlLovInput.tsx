import { Box, CircularProgress, createStyles, makeStyles, TextField, Theme, useTheme } from '@material-ui/core';
import { AutocompleteRenderInputParams } from '@material-ui/lab';
import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface INlLovInput {
  onAddOpen?: () => void;
  placeholder?: string;
  params: AutocompleteRenderInputParams;
  error?: boolean;
  loading?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorColor: {
      color: '#f44336',
    },
    borderErrorColor: {
      '& .MuiInput-underline:before': {
        borderBottomColor: '#f44336',
        borderBottomWidth: 2,
      },
      '& .MuiInput-underline:hover:before': {
        borderBottomColor: '#f44336',
        borderBottomWidth: 2,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#f44336',
        borderBottomWidth: 2,
      },
    },
  }),
);

const NlLovInput: React.FC<INlLovInput> = ({
  onAddOpen,
  placeholder,
  params,
  error = false,
  loading = false,
  onChange,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box display="flex" flex="direction">
      {onAddOpen && (
        <div
          style={{ backgroundColor: theme.palette.primary.main }}
          className="addContainer hover:darken transition-filter"
          onMouseDown={onAddOpen}
        >
          <FiPlus size={20} color="#fff" />
        </div>
      )}
      <TextField
        {...params}
        placeholder={placeholder}
        className="lovTextField"
        onChange={e => onChange && onChange(e)}
        classes={{ root: error ? classes.borderErrorColor : undefined }}
        InputProps={{
          ...params.InputProps,
          className: `${params.InputProps.className} pl-1.5`,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    </Box>
  );
};

export default NlLovInput;
