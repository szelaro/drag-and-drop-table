import { on } from '@ngrx/store';
import { createReducer } from '@ngrx/store/src/reducer_creator';
import { DraggingState, TableState } from 'src/dragging-state';
import {
  startSelection,
  hoverCellAction,
  leaveCellAction,
  release,
  removeSelectionAction,
} from './dragging-state.action';

export const initialState: TableState = {
  draggingState: {
    state: false,
    cursor: 'auto',
  },
  tableData: [
    {
      rowName: 'ADAS',
      cells: [1, 2, 1.5, 2.1, 0.8, 0.7, 1.2, 1.5, 1.4, 2.1],
    },
    {
      rowName: 'PMT Engineering tools',
      cells: [2.9, 3.1, 1.8, 1.2, 1.8, 1.9, 1.1, 2.4, 2.9, 2],
    },
    {
      rowName: 'Webtools',
      cells: [0.2, 0.4, 0.8, 1.6, 3.2, 3, 2.8, 2.6, 2.4, 2.2],
    },
  ],
};

export const draggingStateReducer = createReducer(
  initialState,
  on(startSelection, (state, action) => ({
    ...state,
    draggingState: {
      state: true,
      cursor: 'crosshair',
      startCell: { row: action?.cell?.row, column: action?.cell?.column },
    },
  })),

  on(release, (state, action) =>
    updateTableValues({
      ...state,
      draggingState: {
        state: false,
        cursor: 'auto',
      },
    })
  ),

  on(hoverCellAction, (state, action) => ({
    ...state,
    draggingState: calcIncrementals({
      ...state?.draggingState,
      endCell: { ...action.cell },
    }),
  })),

  on(leaveCellAction, (state, action) => ({
    ...state,
    draggingState: calcIncrementals({ ...state.draggingState, endCell: null }),
  })),

  on(removeSelectionAction, (state) => ({
    ...state,
    draggingState: {
      ...state?.draggingState,
      state: false,
      endCell: null,
      cursor: 'auto',
    },
  }))
);

export function calcIncrementals(draggingState: DraggingState) {
  if (!draggingState?.startCell || !draggingState.endCell) {
    return;
  }

  draggingState.incrementRow = Math.sign(
    draggingState.endCell.row - draggingState.startCell.row
  );
  draggingState.incrementColumn = Math.sign(
    draggingState.endCell.column - draggingState.startCell.column
  );
  return draggingState;
}

export function updateTableValues(state: TableState) {
  if (
    !state?.draggingState?.endCell ||
    isNaN(state.draggingState.endCell.column) ||
    state.draggingState.endCell.column < 0 ||
    isNaN(state.draggingState.endCell.row) ||
    state.draggingState.endCell.row < 0 ||
    !state.draggingState.startCell ||
    isNaN(state.draggingState.startCell?.column) ||
    state.draggingState.startCell.column < 0 ||
    isNaN(state.draggingState.startCell.row) ||
    state.draggingState.startCell.row < 0
  ) {
    return state;
  }

  const copyValue =
    state.tableData[state.draggingState.startCell.row]?.cells[
      state.draggingState.startCell.column
    ] || 0;

  const startRow = Math.min(
    state.draggingState.endCell.row,
    state.draggingState.startCell.row
  );
  const endRow = Math.max(
    state.draggingState.endCell.row,
    state.draggingState.startCell.row
  );
  const startColumn = Math.min(
    state.draggingState.endCell.column,
    state.draggingState.startCell.column
  );
  const endColumn = Math.max(
    state.draggingState.endCell.column,
    state.draggingState.startCell.column
  );
  for (let row = startRow; row <= endRow; row++) {
    for (let column = startColumn; column <= endColumn; column++) {
      if (!state.tableData[row]?.cells) {
        return;
      }

      this.tableData[row].cells[column] = copyValue;
    }
  }
  return state;
}
