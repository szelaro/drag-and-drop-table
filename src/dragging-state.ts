export interface DraggingState {
  state: boolean;
  cursor?: string;
  startCell?: { row: number; column: number };
  endCell?: { row: number; column: number };
  incrementRow?: number;
  incrementColumn?: number;
  tableData?: TableRow[];
}

export interface TableRow {
  rowName?: string;
  cells?: number[];
}

export interface TableState {
  draggingState: DraggingState;
  tableData?: TableRow[];
}
