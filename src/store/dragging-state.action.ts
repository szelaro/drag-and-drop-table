import { Action } from '@ngrx/store';
import { createAction, props } from '@ngrx/store/src/action_creator';

export enum DraggingSateActionType {
  FILL_HANDLE_MOUSE_DOWN = '[ASSIGNMENT_MODAL] Fill Handle Mouse Down',
  RELEASE = '[ASSIGNMENT_MODAL] Release',
  HOVER_CELL = '[ASSIGNMENT_MODAL] Hover Cell',
  LEAVE_CELL = '[ASSIGNMENT_MODAL] Leave Cell',
  REMOVE_SELECTION = '[ASSIGNMENT_MODAL] Remove Selection',
}

export interface CellLocation {
  row: number;
  column: number;
  positionIndex?: number;
}

export const fillHandleMouseDown = createAction(
  DraggingSateActionType.FILL_HANDLE_MOUSE_DOWN,
  props<{ cell: CellLocation }>()
);

export const release = createAction(DraggingSateActionType.RELEASE);

export const hoverCellAction = createAction(
  DraggingSateActionType.HOVER_CELL,
  props<{ cell: CellLocation }>()
);

export const leaveCellAction = createAction(DraggingSateActionType.LEAVE_CELL);

export const removeSelectionAction = createAction(
  DraggingSateActionType.REMOVE_SELECTION
);
