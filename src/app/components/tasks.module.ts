import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from './material/material.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task-form/task-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateCategoryComponent,
    TaskComponent,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    DragDropModule,
    MaterialModule,
    FormsModule
  ]
})
export class TasksModule { }
