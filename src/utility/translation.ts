import { GridLocaleText } from "@mui/x-data-grid";

interface TranslationProps {
  ptBR: Partial<GridLocaleText>;
}

export const translation: TranslationProps = {
  ptBR: {
    checkboxSelectionHeaderName: "Seleção de colunas",
    toolbarExportCSV: "Exportar CSV",
    toolbarExportPrint: "Imprimir",
    checkboxSelectionSelectAllRows: "Selecionar todas as linhas",
    columnsPanelTextFieldLabel: "Nome da coluna",
    columnsPanelShowAllButton: "Mostrar todas",
    columnsPanelHideAllButton: "Esconder todas",
    columnsPanelTextFieldPlaceholder: "Nome da coluna",
    toolbarQuickFilterPlaceholder: "Pesquisar",
    toolbarExport: "Exportar",

    toolbarFilters: "Filtros",
    toolbarFiltersLabel: "Mostrar filtros",
    toolbarFiltersTooltipHide: "Esconder filtros",
    toolbarFiltersTooltipShow: "Mostrar filtros",
    toolbarFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,

    columnHeaderFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} filtros ativos` : `${count} filtro ativo`,
    columnHeaderFiltersLabel: "Mostrar filtros",
    columnHeaderSortIconLabel: "Ordenar",

    // Filter operators text
    filterOperatorContains: "Contém",
    filterOperatorEquals: "igual",
    filterOperatorStartsWith: "começa com",
    filterOperatorEndsWith: "termina com",
    filterOperatorIs: "é",
    filterOperatorNot: "não é",
    filterOperatorAfter: "é após",
    filterOperatorOnOrAfter: "é em ou após",
    filterOperatorBefore: "é antes",
    filterOperatorOnOrBefore: "é em ou antes",
    filterOperatorIsEmpty: "está vazio",
    filterOperatorIsNotEmpty: "não está vazio",
    filterOperatorIsAnyOf: "tem um dos",

    // Filter values text
    filterValueAny: "qualquer",
    filterValueTrue: "verdadeiro",
    filterValueFalse: "falso",

    // Filter panel text
    filterPanelAddFilter: "Adicionar filtro",
    filterPanelDeleteIconLabel: "Deletar",
    filterPanelLinkOperator: "Operador lógico",
    filterPanelOperators: "Operador", // TODO v6: rename to filterPanelOperator
    filterPanelOperatorAnd: "E",
    filterPanelOperatorOr: "Ou",
    filterPanelColumns: "Colunas",
    filterPanelInputLabel: "Valor",
    filterPanelInputPlaceholder: "Filtrar valor",

    // Columns selector toolbar button text
    toolbarColumns: "Colunas",
    toolbarColumnsLabel: "Selecionar colunas",
  },
};
