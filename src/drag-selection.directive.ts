import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appDragSelection]'
})
export class DragSelectionDirective implements OnChanges {

  protected elementClassArray: string[] = [];

  @Input('class')
  @HostBinding('class')
  get elementClass(): string {
    return this.elementClassArray.join(' ');
  }
  set(val: string) {
    this.elementClassArray = val.split(' ');
  }

  @Input('draggingState') draggingState: {
    state: boolean;
    startCell?: { row: number; column: number };
    endCell?: { row: number; column: number };
    incrementRow?: number;
    incrementColumn?: number;
  }
  @Input() row: number;
  @Input() column: number;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes) { return; }

    if (changes.hasOwnProperty('draggingState') && !isNaN(this.row) && !isNaN(this.column)) {
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
        if (this.elementClassArray?.indexOf('cell-in-selection') === -1) {
          this.elementClassArray.push('cell-in-selection');
        }
      } else {
        this.elementClassArray = this.elementClassArray?.filter(item => item !== 'cell-in-selection');
      }
    }
  }

}