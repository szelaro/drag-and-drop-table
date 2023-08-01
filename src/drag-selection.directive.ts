import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { DraggingState } from './dragging-state';
import { selectDraggingState } from './store/dragging-state.selector';

@Directive({
  selector: '[appDragSelection]',
})
export class DragSelectionDirective implements OnInit {
  @Input() row: number;
  @Input() column: number;

  draggingState: DraggingState;

  constructor(private el: ElementRef, private readonly store: Store) {}

  ngOnInit() {
    this.store
      .select(selectDraggingState)
      ?.subscribe((draggingState: DraggingState) => {
        this.handleDraggingStateChange(draggingState);
      });
  }

  handleDraggingStateChange(draggingState: DraggingState) {
    if (!draggingState || isNaN(this.row) || isNaN(this.column)) {
      return;
    }

    this.draggingState = draggingState;
    this.el.nativeElement.classList.remove('dragging-origo');

    const isInSelection: boolean =
      this.draggingState.state &&
      this.draggingState.startCell &&
      this.draggingState.endCell &&
      ((this.draggingState.incrementRow >= 0 &&
        this.row >= this.draggingState.startCell.row &&
        this.row <= this.draggingState.endCell.row) ||
        (this.draggingState.incrementRow === -1 &&
          this.row <= this.draggingState.startCell.row &&
          this.row >= this.draggingState.endCell.row)) &&
      ((this.draggingState.incrementColumn >= 0 &&
        this.column >= this.draggingState.startCell.column &&
        this.column <= this.draggingState.endCell.column) ||
        (this.draggingState.incrementColumn === -1 &&
          this.column <= this.draggingState.startCell.column &&
          this.column >= this.draggingState.endCell.column));
    if (isInSelection) {
      this.el.nativeElement.classList.add('cell-in-selection');
      if (
        this.row === draggingState.startCell.row &&
        this.column === draggingState.startCell.column
      ) {
        this.el.nativeElement.classList.add('dragging-origo');
      }
    } else {
      this.el.nativeElement.classList.remove('cell-in-selection');
    }
  }
}
