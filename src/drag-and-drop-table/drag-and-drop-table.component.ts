import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  applyCopy,
  hoverCellAction,
  leaveCellAction,
  removeSelectionAction,
  startSelection,
} from 'src/store/dragging-state.action';
import { selectTableData } from 'src/store/dragging-state.selector';
import { DraggingState, TableRow } from '../dragging-state';

@Component({
  selector: 'app-drag-and-drop-table',
  templateUrl: './drag-and-drop-table.component.html',
  styleUrls: ['./drag-and-drop-table.component.css'],
})
export class DragAndDropTableComponent implements OnInit {
  draggingStateSubject: Subject<DraggingState> = new Subject<DraggingState>();
  tableData: Observable<TableRow[]>;

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.store.dispatch(applyCopy());
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  @HostBinding('style.cursor') private cursor = 'default';

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.tableData = this.store.select(selectTableData);
  }

  onFillHandleButtonClicked(row: number, column: number, event: MouseEvent) {
    if (event.button === 2) {
      // on right click remove selection
      event.preventDefault();
      this.store.dispatch(removeSelectionAction());
      return;
    }

    this.store.dispatch(startSelection({ cell: { row: row, column: column } }));
  }

  onRightClickMouseDown(event: MouseEvent) {
    if (event.button === 0) {
      return;
    } // on left click return

    // on right click remove selection
    event.preventDefault();
    this.store.dispatch(removeSelectionAction());
  }

  onMouseEnterCell(row: number, column: number) {
    this.store.dispatch(
      hoverCellAction({ cell: { row: row, column: column } })
    );
  }

  onMouseLeaveCell(row: number, column: number) {
    this.store.dispatch(leaveCellAction());
  }
}
