import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
} from '@angular/core';
import { DraggingState } from './dragging-state';

@Directive({
  selector: '[appDragSelection]',
})
export class DragSelectionDirective implements OnChanges {
  @Input('draggingState') draggingState: DraggingState;
  @Input() row: number;
  @Input() column: number;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!changes) {
      return;
    }

    if (
      changes.hasOwnProperty('draggingState') &&
      !isNaN(this.row) &&
      !isNaN(this.column)
    ) {
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
      } else {
        this.el.nativeElement.classList.remove('cell-in-selection');
      }
    }
  }
}
