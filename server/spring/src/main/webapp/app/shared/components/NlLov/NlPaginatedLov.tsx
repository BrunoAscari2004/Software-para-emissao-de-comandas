/* eslint-disable no-console */
import { Box, createStyles, FormHelperText, makeStyles, Popper, Theme } from '@material-ui/core';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ControllerRenderProps, FieldPath } from 'react-hook-form';
import './lov.scss';
import NlLovInput from './components/NlLovInput';
import NlLovOption from './components/NlLovOption';

export interface IPaginatedLovRef {
  getData: (currentSearch: string) => Promise<any[]>;
}

interface IPaginatedLovProps extends Partial<AutocompleteProps<any, true, true, true>> {
  getData: (currentSearch: string) => Promise<any[]> | any[];
  onAddOpen?: () => void;
  field?: ControllerRenderProps<any, FieldPath<any>>;
  error?: boolean;
  helperText?: string;
  width?: number;
  idColumnWidth?: number;
  ref?: React.Ref<IPaginatedLovRef>;
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

function generateAutocompleteClasses(width: number) {
  return makeStyles((theme: Theme) =>
    createStyles({
      autocomplete: {
        width,
        paddingRight: 10,
        '& > * + *': {
          marginTop: theme.spacing(3),
        },
      },
    }),
  )();
}

const NlPaginatedLov = forwardRef<IPaginatedLovRef, IPaginatedLovProps>(
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
      width: widthProp = 400,
      ...props
    },
    ref,
  ) => {
    const classes = useStyles();

    const autocompleteClasses = generateAutocompleteClasses(widthProp);

    const [textfieldValue, setTextfieldValue] = useState('');
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

      const parsedData = await getData(textfieldValue);

      setSearchExecuted(true);

      if (parsedData.length === 0) {
        setOptions([]);
        return [];
      }

      parsedData.sort((a, b) => {
        const codA = Number(Object.values(a)[0]);
        const codB = Number(Object.values(b)[0]);

        if (codA < codB) {
          return -1;
        } else if (codA > codB) {
          return 1;
        } else {
          return 0;
        }
      });

      if (active) {
        setOptions(parsedData);
      }

      return parsedData;
    };

    useEffect(() => {
      let active = true;
      if (!open) return;

      getLovData(active);

      return () => {
        active = false;
      };
    }, [open, textfieldValue]);

    return (
      <div className={props.className}>
        <Autocomplete
          {...props}
          {...field}
          onChange={(e, newValue, reason, details) => {
            field?.onChange(newValue);
            if (newValue === null) getLovData(true);
            props.onChange && props.onChange(e, newValue, reason, details);
          }}
          className={`lovInput ${error ? 'lov-underline-error' : ''} ${classes.colloredSvg}`}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          noOptionsText="Sem resultados"
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
              onChange={e => setTextfieldValue(e.target.value)}
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

export default NlPaginatedLov;
