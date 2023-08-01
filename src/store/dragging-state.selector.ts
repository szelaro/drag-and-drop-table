import { TableState } from 'src/dragging-state';

export const selectTableData = (tableState: TableState) => tableState.tableData;
export const selectDraggingState = (tableState: TableState) =>
  tableState.draggingState;
export const selectCursor = (tableState: TableState) =>
  tableState?.draggingState?.cursor || 'auto';
