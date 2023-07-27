import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropTableComponent } from './drag-and-drop-table/drag-and-drop-table.component';
import { DragSelectionDirective } from './drag-selection.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DragAndDropTableComponent, DragSelectionDirective],
  exports: [DragAndDropTableComponent, DragSelectionDirective]
})
export class AppModule {}
