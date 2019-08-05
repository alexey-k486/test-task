import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task } from '../../shared/models/task';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() taskEdit: Task;
  @Input() action: string;
  @Output() public cancel: EventEmitter<void> = new EventEmitter();
  @Output() public update: EventEmitter<any> = new EventEmitter();
  @Output() public delete: EventEmitter<void> = new EventEmitter();
  @Output() public create: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.taskEdit, 'task-form');
  }

  public closeForm(): void {
    this.cancel.emit();
  }

  public updateTask(task): void {
    task.value.id = this.taskEdit.id;
    task.value.categoryId = this.taskEdit.categoryId;
    this.update.emit(task.value);
  }

  public deleteTask(task): void {
    task.value.id = this.taskEdit.id;
    this.delete.emit(task.value);
  }

  public createTask(task): void {
    task.value.categoryId = this.taskEdit.categoryId;
    this.create.emit(task.value);
  }
}
