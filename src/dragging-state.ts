export interface DraggingState {
  state: boolean;
  startCell?: { row: number; column: number };
  endCell?: { row: number; column: number };
  incrementRow?: number;
  incrementColumn?: number;
}
