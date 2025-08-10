const Spanish = {
  noRowsLabel: "Sin filas",
  noResultsOverlayLabel: "No se encontraron resultados.",
  MuiTablePagination: {
    labelRowsPerPage: "Filas por página:",
  },

  // Selector de densidad en la barra de herramientas
  toolbarDensity: "Densidad",
  toolbarDensityLabel: "Densidad",
  toolbarDensityCompact: "Compacto",
  toolbarDensityStandard: "Estándar",
  toolbarDensityComfortable: "Cómodo",

  // Selector de columnas en la barra de herramientas
  toolbarColumns: "Columnas",
  toolbarColumnsLabel: "Seleccionar columnas",

  // Botones de la barra de herramientas para filtros
  toolbarFilters: "Filtros",
  toolbarFiltersLabel: "Mostrar filtros",
  toolbarFiltersTooltipHide: "Ocultar filtros",
  toolbarFiltersTooltipShow: "Mostrar filtros",
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros activos` : `${count} filtro activo`,

  // Campo de filtro rápido en la barra de herramientas
  toolbarQuickFilterPlaceholder: "Buscar...",
  toolbarQuickFilterLabel: "Buscar",
  toolbarQuickFilterDeleteIconLabel: "Limpiar",

  // Botón de exportar en la barra de herramientas
  toolbarExport: "Exportar",
  toolbarExportLabel: "Exportar",
  toolbarExportCSV: "Descargar como CSV",
  toolbarExportPrint: "Imprimir",

  // Texto del panel de columnas
  columnsPanelTextFieldLabel: "Buscar columna",
  columnsPanelTextFieldPlaceholder: "Título de la columna",
  columnsPanelDragIconLabel: "Reordenar columna",
  columnsPanelShowAllButton: "Mostrar todas",
  columnsPanelHideAllButton: "Ocultar todas",

  // Texto del panel de filtros
  filterPanelAddFilter: "Agregar filtro",
  filterPanelRemoveAll: "Eliminar todos",
  filterPanelDeleteIconLabel: "Eliminar",
  filterPanelLogicOperator: "Operador lógico",
  filterPanelOperator: "Operador",
  filterPanelOperatorAnd: "Y",
  filterPanelOperatorOr: "O",
  filterPanelColumns: "Columnas",
  filterPanelInputLabel: "Valor",
  filterPanelInputPlaceholder: "Valor del filtro",

  // Texto de los operadores de filtro
  filterOperatorContains: "contiene",
  filterOperatorEquals: "es igual a",
  filterOperatorStartsWith: "comienza con",
  filterOperatorEndsWith: "termina con",
  filterOperatorIs: "es",
  filterOperatorNot: "no es",
  filterOperatorAfter: "es después de",
  filterOperatorOnOrAfter: "es en o después de",
  filterOperatorBefore: "es antes de",
  filterOperatorOnOrBefore: "es en o antes de",
  filterOperatorIsEmpty: "está vacío",
  filterOperatorIsNotEmpty: "no está vacío",
  filterOperatorIsAnyOf: "es alguno de",
  "filterOperator=": "=",
  "filterOperator!=": "!=",
  "filterOperator>": ">",
  "filterOperator>=": ">=",
  "filterOperator<": "<",
  "filterOperator<=": "<=",

  // Texto de los operadores de filtro en el encabezado
  headerFilterOperatorContains: "Contiene",
  headerFilterOperatorEquals: "Es igual a",
  headerFilterOperatorStartsWith: "Comienza con",
  headerFilterOperatorEndsWith: "Termina con",
  headerFilterOperatorIs: "Es",
  headerFilterOperatorNot: "No es",
  headerFilterOperatorAfter: "Es después de",
  headerFilterOperatorOnOrAfter: "Es en o después de",
  headerFilterOperatorBefore: "Es antes de",
  headerFilterOperatorOnOrBefore: "Es en o antes de",
  headerFilterOperatorIsEmpty: "Está vacío",
  headerFilterOperatorIsNotEmpty: "No está vacío",
  headerFilterOperatorIsAnyOf: "Es alguno de",
  "headerFilterOperator=": "Es igual a",
  "headerFilterOperator!=": "No es igual a",
  "headerFilterOperator>": "Mayor que",
  "headerFilterOperator>=": "Mayor o igual que",
  "headerFilterOperator<": "Menor que",
  "headerFilterOperator<=": "Menor o igual que",

  // Texto de los valores del filtro
  filterValueAny: "cualquier",
  filterValueTrue: "verdadero",
  filterValueFalse: "falso",

  // Texto del menú de columna
  columnMenuLabel: "Menú",
  columnMenuShowColumns: "Mostrar columnas",
  columnMenuManageColumns: "Administrar columnas",
  columnMenuFilter: "Filtrar",
  columnMenuHideColumn: "Ocultar columna",
  columnMenuUnsort: "Sin orden",
  columnMenuSortAsc: "Ordenar de forma ascendente",
  columnMenuSortDesc: "Ordenar de forma descendente",

  // Texto del encabezado de la columna
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} filtros activos` : `${count} filtro activo`,
  columnHeaderFiltersLabel: "Mostrar filtros",
  columnHeaderSortIconLabel: "Ordenar",

  // Texto del pie de página cuando se seleccionan filas
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : `${count.toLocaleString()} fila seleccionada`,

  // Texto del pie de página para la cantidad total de filas
  footerTotalRows: "Total de filas:",

  // Texto del pie de página para la cantidad total de filas visibles
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Texto de celda booleana
  booleanCellTrueLabel: "sí",
  booleanCellFalseLabel: "no",

  // Texto de paginación
  paginationFirstPage: "Primera página",
  paginationFirstPageAriaLabel: "Primera página",
  paginationPreviousPage: "Página anterior",
  paginationPreviousPageAriaLabel: "Página anterior",
  paginationNextPage: "Página siguiente",
  paginationNextPageAriaLabel: "Página siguiente",
  paginationLastPage: "Última página",
  paginationLastPageAriaLabel: "Última página",
  paginationAriaLabel: "Paginación",
  paginationToolbarAriaLabel: "Cambiar página",
  pageSizeAriaLabel: "Tamaño de página",
  paginationTotalRows: (from, to, count) =>
    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : `${count.toLocaleString()} fila seleccionada`,
};
export default Spanish;
