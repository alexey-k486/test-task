import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task } from '../../shared/models/task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() taskEdit: Task;
  @Input() action: string;
  @Output() public cancel: EventEmitter<void> = new EventEmitter();
  @Output() public update: EventEmitter<Task> = new EventEmitter();
  @Output() public delete: EventEmitter<Task> = new EventEmitter();
  @Output() public create: EventEmitter<Task> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  public closeForm(): void {
    this.cancel.emit();
  }

  public updateTask(task: NgForm): void {
    task.value.id = this.taskEdit.id;
    task.value.categoryId = this.taskEdit.categoryId;
    this.update.emit(task.value);
  }

  public deleteTask(task: NgForm): void {
    task.value.id = this.taskEdit.id;
    this.delete.emit(task.value);
  }

  public createTask(task: NgForm): void {
    task.value.categoryId = this.taskEdit.categoryId;
    this.create.emit(task.value);
  }
}
