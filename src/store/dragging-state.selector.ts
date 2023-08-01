import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store/src/selector';
import { TableState } from '../dragging-state';

export const selectTableState = createFeatureSelector<TableState>('tableState');

export const selectTableData = createSelector(
  selectTableState,
  (tableState) => tableState?.tableData || []
);
export const selectDraggingState = createSelector(
  selectTableState,
  (tableState) => tableState?.draggingState || { state: false }
);
export const selectCursor = createSelector(
  selectTableState,
  (tableState) => tableState?.draggingState?.cursor || 'auto'
);
