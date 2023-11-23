/* eslint-disable no-console */
import { Box, createStyles, FormHelperText, makeStyles, Popper, Theme } from '@material-ui/core';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ControllerRenderProps, FieldPath } from 'react-hook-form';
import './lov.scss';
import NlLovInput from './components/NlLovInput';
import NlLovOption from './components/NlLovOption';

export interface ILovRef {
  getData: () => Promise<any[]>;
}
interface ILovProps extends Partial<AutocompleteProps<any, true, true, true>> {
  getData: () => Promise<any[]> | any[];
  onAddOpen?: () => void;
  field?: ControllerRenderProps<any, FieldPath<any>>;
  error?: boolean;
  helperText?: string;
  width?: number;
  minWidth?: number;
  idColumnWidth?: number;
  ref?: React.Ref<ILovRef>;
  watch?: any;
  flex?: boolean;
  maxWidth?: number;
}

interface IOption {
  [key: string]: string;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridItem: {
      minWidth: 50,
    },
    gridContainer: {
      margin: '0',
    },
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
    customScrollbar: {
      '&::-webkit-scrollbar': {
        width: 10,
      },
      '&::-webkit-scrollbar-track': {
        background: '#F9F9F9',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#b3b3b3',
        borderRadius: 10,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#9e9e9e',
      },
    },
    colloredSvg: {
      '&.Mui-focused .MuiAutocomplete-clearIndicator .MuiIconButton-label .MuiSvgIcon-root': {
        color: theme.palette.primary.main /* cor do X para fechar quando focado*/,
      },
      '&.Mui-focused .MuiAutocomplete-popupIndicator .MuiIconButton-label .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
      },
    },
  }),
);

function generateAutocompleteClasses(minWidth: number, flex: boolean, width?: number, maxWidth?: number) {
  return makeStyles((theme: Theme) =>
    createStyles({
      autocomplete: {
        minWidth,
        maxWidth: maxWidth ?? '100%',
        width: flex ? '100%' : width ?? 400,
        '& > * + *': {
          marginTop: theme.spacing(3),
        },
      },
    }),
  )();
}

const NlLov = forwardRef<ILovRef, ILovProps>(
  (
    {
      renderOption,
      getData,
      onAddOpen,
      placeholder,
      field,
      idColumnWidth,
      error = false,
      helperText,
      width,
      minWidth = 400,
      maxWidth,
      watch,
      flex = false,
      ...props
    },
    ref,
  ) => {
    const classes = useStyles();

    const autocompleteClasses = generateAutocompleteClasses(minWidth, flex, width, maxWidth);

    const [open, setOpen] = useState(false);
    const [searchExecuted, setSearchExecuted] = useState(false);
    const [options, setOptions] = useState<any[]>([]);
    const loading = open && !searchExecuted && options.length === 0;

    useImperativeHandle(
      ref,
      () => {
        return {
          getData: () => getLovData(true),
        };
      },
      [],
    );

    const getLovData = async (active: boolean): Promise<any[]> => {
      setSearchExecuted(false);
      const parsedData = await getData();
      setSearchExecuted(true);

      if (parsedData.length === 0) {
        setOptions([]);
        return [];
      }

      if (active) {
        setOptions(parsedData);
      }

      return parsedData;
    };

    useEffect(() => {
      if (watch === undefined) return;
      let active = true;

      getLovData(active);

      return () => {
        active = false;
      };
    }, [watch]);

    useEffect(() => {
      let active = true;

      if (!loading) return;

      getLovData(active);

      return () => {
        active = false;
      };
    }, [open]);

    return (
      <div className={`flex w-full flex-col ${props.className ?? ''}`}>
        <Autocomplete
          {...props}
          {...field}
          onChange={(e, newValue, reason, details) => {
            field?.onChange(newValue);
            props.onChange && props.onChange(e, newValue, reason, details);
          }}
          className={`lovInput ${error ? 'lov-underline-error' : ''} ${classes.colloredSvg}`}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          noOptionsText={props.noOptionsText ?? 'Sem resultados'}
          options={options}
          getOptionLabel={option => String(Object.entries(option)[1][1]) || ''}
          loading={loading}
          loadingText="Carregando..."
          classes={{
            root: autocompleteClasses.autocomplete,
          }}
          PopperComponent={popperProps => (
            <Popper {...popperProps} className={`lov-dinamic-border-radius ${popperProps.className}`} />
          )}
          renderOption={
            renderOption
              ? renderOption
              : (option: IOption, { inputValue }) => (
                  <NlLovOption option={option} inputValue={inputValue} idColumnWidth={idColumnWidth} />
                )
          }
          renderInput={params => (
            <NlLovInput
              params={params}
              loading={loading}
              placeholder={placeholder}
              error={error}
              onAddOpen={onAddOpen}
            />
          )}
        />
        {helperText && (
          <Box width="100%" marginLeft={1.8}>
            <FormHelperText classes={{ root: error ? classes.errorColor : '' }}> {helperText} </FormHelperText>
          </Box>
        )}
      </div>
    );
  },
);

export default NlLov;
