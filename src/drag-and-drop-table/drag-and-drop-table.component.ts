import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop-table',
  templateUrl: './drag-and-drop-table.component.html',
  styleUrls: ['./drag-and-drop-table.component.css'],
})
export class DragAndDropTableComponent implements OnInit {
  draggingState: {
    state: boolean;
    startCell?: { row: number; column: number };
    endCell?: { row: number; column: number };
    incrementRow?: number;
    incrementColumn?: number;
  } = { state: false };

  tableData: {
    rowName: string;
    cells: number[];
  }[] = [
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
  ];
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (!this.draggingState || !this.tableData?.length) {
      return;
    }

    this.draggingState.state = false;
    console.log(this.draggingState);
    if (
      !this.draggingState.endCell ||
      isNaN(this.draggingState.endCell.column) ||
      this.draggingState.endCell.column < 0 ||
      isNaN(this.draggingState.endCell.row) ||
      this.draggingState.endCell.row < 0 ||
      !this.draggingState.startCell ||
      isNaN(this.draggingState.startCell?.column) ||
      this.draggingState.startCell.column < 0 ||
      isNaN(this.draggingState.startCell.row) ||
      this.draggingState.startCell.row < 0
    ) {
      return;
    }

    const copyValue =
      this.tableData[this.draggingState.startCell.row]?.cells[
        this.draggingState.startCell.column
      ] || 0;

    const startRow = Math.min(
      this.draggingState.endCell.row,
      this.draggingState.startCell.row
    );
    const endRow = Math.max(
      this.draggingState.endCell.row,
      this.draggingState.startCell.row
    );
    const startColumn = Math.min(
      this.draggingState.endCell.column,
      this.draggingState.startCell.column
    );
    const endColumn = Math.max(
      this.draggingState.endCell.column,
      this.draggingState.startCell.column
    );
    for (let row = startRow; row <= endRow; row++) {
      for (let column = startColumn; column <= endColumn; column++) {
        if (!this.tableData[row]?.cells) {
          return;
        }

        this.tableData[row].cells[column] = copyValue;
      }
    }
  }

  constructor() {
    this.reset();
  }

  ngOnInit() {}

  onFillHandleButtonClicked(row: number, column: number) {
    this.draggingState = {
      state: true,
      startCell: { row: row, column: column },
      endCell: { row: row, column: column },
      incrementColumn: 0,
      incrementRow: 0,
    };
  }

  onMouseEnterCell(row: number, column: number) {
    if (!this.draggingState?.state) {
      return;
    }

    this.draggingState.endCell = { row: row, column: column };
    this.calcIncrementals();
  }

  onMouseLeaveCell(row: number, column: number) {
    if (!this.draggingState?.state) {
      return;
    }

    this.draggingState.endCell = {
      row: this.draggingState.startCell?.row || null,
      column: this.draggingState.startCell?.column || null,
    };
    this.calcIncrementals();
  }

  private calcIncrementals() {
    if (!this.draggingState?.startCell || !this.draggingState.endCell) {
      return;
    }

    this.draggingState.incrementRow = Math.sign(
      this.draggingState.endCell.row - this.draggingState.startCell.row
    );
    this.draggingState.incrementColumn = Math.sign(
      this.draggingState.endCell.column - this.draggingState.startCell.column
    );
  }

  reset() {}
}
