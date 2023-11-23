// import { createTheme } from '@material-ui/core/styles';
// O componente de SwipableDrawer causa um erro na hora que é montada usando o createTheme normal.
// Esse componente é usado para as barras de pesquisa, e para que não cause o erro no console, é
// necessário usar a versão unstable (06/08/21)

const hoverOpacity = 0.04;

const theme = {
    palette: {
        action: {
            hoverOpacity,
        },
    },
    overrides: {
        MuiGrid: {
            root: {
                '&&:has(label)': {
                    textAlign: 'end',
                },
            },
        },
        MuiButtonBase: {
            root: {
                '&[class*="MuiButton-containedPrimary"]': {
                    color: '#fff',
                    fontWeight: 'bold',
                },
            },
        },
        MuiTabs: {
            root: {
                backgroundColor: '#fdfdfd',
            },
        },
        MuiAppBar: {
            root: {
                boxShadow: undefined,
            },
        },
        MuiInputBase: {
            input: {
                fontSize: 13,
            },
        },
        MuiRadio: {
            root: {
                '& .MuiSvgIcon-root': {
                    height: 20,
                    width: 20,
                },
            },
        },
        MuiInput: {
            underline: {
                '&:not($disabled):before': {
                    zIndex: 10,
                },
            },
        },
        MuiTypography: {
            root: {
                fontSize: 13,
            },
        },
        MuiTableBody: {
            root: {
                '&& .MuiTableRow-root': {
                    transition: 'background-color 0.2s',
                    '&:nth-of-type(odd)': {
                        backgroundColor: `rgba(0, 0, 0, ${hoverOpacity})`,
                    },
                    '&:hover': {
                        backgroundColor: `rgba(0, 0, 0, ${hoverOpacity + 0.04})`,
                    },
                },
            },
        },
        MuiTextField: {
            root: {
                '&:not(.lovTextField)': {
                    overflow: 'hidden',
                    borderRadius: 5,
                    width: 200,

                    '& .MuiFilledInput-input': {
                        padding: '7px 10px',
                    },
                },
                '& .MuiFilledInput-input:-webkit-autofill': {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                },
                '&, &:hover, &:focus, &:focus-within, &:disabled': {
                    '& div': {
                        backgroundColor: '#f9f9f9',
                    },
                },
                '& .MuiFilledInput-root.Mui-disabled': {
                    backgroundColor: '#fcfcfc',
                },
                '& .MuiFilledInput-underline.Mui-disabled:before': {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.20);',
                },
                '& .MuiFilledInput-underline:before': {
                    borderBottom: '1px solid rgba(0, 0, 0, 0.18);',
                },
                '&:has .MuiInputBase-root:has(input[type="number"])': {
                    width: 125,
                    '& input': {
                        textAlign: 'left',
                    },
                },
            },
        },
    },
};

// Não há override do componente de Autocomplete atualmente.
// Alterações feitas no global.scss

export default theme;
