import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from './material/material.module';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    DragDropModule,
    MaterialModule
  ]
})
export class TasksModule { }
