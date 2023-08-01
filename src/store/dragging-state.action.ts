import { Action } from '@ngrx/store';
import { createAction, props } from '@ngrx/store/src/action_creator';

export enum DraggingSateActionType {
  START_SELECTION = '[ASSIGNMENT_MODAL] Fill Handle Mouse Down',
  APPLY_COPY = '[ASSIGNMENT_MODAL] Release',
  HOVER_CELL = '[ASSIGNMENT_MODAL] Hover Cell',
  LEAVE_CELL = '[ASSIGNMENT_MODAL] Leave Cell',
  REMOVE_SELECTION = '[ASSIGNMENT_MODAL] Remove Selection',
}

export interface CellLocation {
  row: number;
  column: number;
  positionIndex?: number;
}

export const startSelection = createAction(
  DraggingSateActionType.START_SELECTION,
  props<{ cell: CellLocation }>()
);

export const applyCopy = createAction(DraggingSateActionType.APPLY_COPY);

export const hoverCellAction = createAction(
  DraggingSateActionType.HOVER_CELL,
  props<{ cell: CellLocation }>()
);

export const leaveCellAction = createAction(DraggingSateActionType.LEAVE_CELL);

export const removeSelectionAction = createAction(
  DraggingSateActionType.REMOVE_SELECTION
);
