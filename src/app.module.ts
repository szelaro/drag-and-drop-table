import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropTableComponent } from './drag-and-drop-table/drag-and-drop-table.component';
import { DragSelectionDirective } from './drag-selection.directive';
import { StoreModule } from '@ngrx/store';
import { draggingStateReducer } from './store/dragging-state.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({
      draggingState: draggingStateReducer,
    }),
  ],
  declarations: [DragAndDropTableComponent, DragSelectionDirective],
  exports: [DragAndDropTableComponent, DragSelectionDirective],
})
export class AppModule {}
