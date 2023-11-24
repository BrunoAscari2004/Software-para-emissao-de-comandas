import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";

import { MUI_DATAGRID_PT_BR } from "./shared/locale/Datagrid/ptBR";

const hoverOpacity = 0.04;
export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];
const mainColor = "#06b6d4";

export const mainTheme = createMuiTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          textTransform: "capitalize",
        },
      },
    },
    MuiDataGrid: {
      defaultProps: {
        autoHeight: true,
        localeText: MUI_DATAGRID_PT_BR,
        initialState: {
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        },
      },
      styleOverrides: {
        root: {
          border: 0,
          padding: "0.150rem 1rem",

          "& .MuiCheckbox-root": {
            padding: "3px 9px",
          },
          // '& .MuiDataGrid-columnSeparator': {
          //     backgroundColor: `#FC7422`,
          // },

          "& .MuiDataGrid-renderingZone, .MuiDataGrid-virtualScrollerContent": {
            "& .MuiDataGrid-row": {
              border: 0,
              cursor: "pointer",
              transition: "background-color 0.2s",
              "&:hover": {
                backgroundColor: "#E0E0E0",
              },
            },

            "& .MuiDataGrid-row:first-of-type": {
              borderTopLeftRadius: "3px",
              borderBottomLeftRadius: "3px",
              overflow: "hidden",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: `rgba(0, 0, 0, ${hoverOpacity})`,

              "&:hover": {
                backgroundColor: "#E0E0E0",
              },

              "&.Mui-selected": {
                backgroundColor: `rgba(var(--color-primary), 0.1)`,

                "&:hover": {
                  backgroundColor: `rgba(12, 6, 63, 0.12);`,
                },
              },
            },
            "& .MuiDataGrid-row:last-of-type": {
              borderTopRightRadius: "3px",
              borderBottomRightRadius: "3px",
              overflow: "hidden",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: `2px solid ${mainColor}`,
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
          },
        },
      },
    },
  },
});
