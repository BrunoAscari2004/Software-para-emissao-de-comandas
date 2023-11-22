import { GridLocaleText } from "@mui/x-data-grid";
import { DefaultTablePagination } from "../../components/DefaultTablePagination";

export const MUI_DATAGRID_PT_BR: Partial<GridLocaleText> = {
  // Root
  noRowsLabel: "Sem dados",
  noResultsOverlayLabel: "Nenhum resultado encontrado.",
  // errorOverlayDefaultLabel: 'Ocorreu um erro.',

  // Density selector toolbar button text
  toolbarDensity: "Densidade",
  toolbarDensityLabel: "Densidade",
  toolbarDensityCompact: "Compacto",
  toolbarDensityStandard: "Padrão",
  toolbarDensityComfortable: "Confortável",

  // Columns selector toolbar button text
  toolbarColumns: "Colunas",
  toolbarColumnsLabel: "Exibir seletor de colunas",

  // Filters toolbar button text
  toolbarFilters: "Filtros",
  toolbarFiltersLabel: "Exibir filtros",
  toolbarFiltersTooltipHide: "Ocultar filtros",
  toolbarFiltersTooltipShow: "Exibir filtros",
  toolbarFiltersTooltipActive: (count) =>
    `${count} ${count !== 1 ? "filtros" : "filtro"} ${
      count !== 1 ? "ativos" : "ativo"
    }`,

  // Export selector toolbar button text
  toolbarExport: "Exportar",
  toolbarExportLabel: "Exportar",
  toolbarExportCSV: "Baixar como CSV",
  toolbarExportPrint: "Imprimir",

  // Columns panel text
  columnsPanelTextFieldLabel: "Localizar coluna",
  columnsPanelTextFieldPlaceholder: "Título da coluna",
  columnsPanelDragIconLabel: "Reordenar Coluna",
  columnsPanelShowAllButton: "Mostrar todas",
  columnsPanelHideAllButton: "Ocultar todas",

  // Filter panel text
  filterPanelAddFilter: "Adicionar filtro",
  filterPanelDeleteIconLabel: "Excluir",
  filterPanelOperator: "Operadores",
  filterPanelOperatorAnd: "E",
  filterPanelOperatorOr: "Ou",
  filterPanelColumns: "Colunas",
  filterPanelInputLabel: "Valor",
  filterPanelInputPlaceholder: "Filtrar valor",

  // Filter operators text
  filterOperatorContains: "contém",
  filterOperatorEquals: "é igual a",
  filterOperatorStartsWith: "começa com",
  filterOperatorEndsWith: "termina com",
  filterOperatorIs: "é",
  filterOperatorNot: "não é",
  filterOperatorAfter: "após",
  filterOperatorOnOrAfter: "em ou após",
  filterOperatorBefore: "antes de",
  filterOperatorOnOrBefore: "em ou antes de",
  filterOperatorIsEmpty: "está vazio",
  filterOperatorIsNotEmpty: "não está vazio",

  // Filter values text
  filterValueAny: "qualquer",
  filterValueTrue: "verdadeiro",
  filterValueFalse: "falso",

  // Column menu text
  columnMenuLabel: "Menu",
  columnMenuShowColumns: "Exibir colunas",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar",
  columnMenuUnsort: "Desfazer ordenação",
  columnMenuSortAsc: "Ordenar do menor para o maior",
  columnMenuSortDesc: "Ordenar do maior para o menor",

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    `${count} ${count !== 1 ? "filtros" : "filtro"} ${
      count !== 1 ? "ativos" : "ativo"
    }`,
  columnHeaderFiltersLabel: "Exibir Filtros",
  columnHeaderSortIconLabel: "Ordenar",

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} linhas selecionadas`
      : `${count.toLocaleString()} linha selecionada`,

  // Total rows footer text
  footerTotalRows: "Total de linhas:",

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: "Seleção",

  // Boolean cell text
  booleanCellTrueLabel: "sim",
  booleanCellFalseLabel: "não",

  // Actions cell more text
  actionsCellMore: "mais",

  MuiTablePagination: {
    labelRowsPerPage: "Linhas por página",
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} de ${count !== -1 ? count : "mais de " + to}`,
    ActionsComponent: DefaultTablePagination,
  },
};
