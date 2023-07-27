import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropTableComponent } from './drag-and-drop-table/drag-and-drop-table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DragAndDropTableComponent],
  exports: [DragAndDropTableComponent]
})
export class AppModule {}
