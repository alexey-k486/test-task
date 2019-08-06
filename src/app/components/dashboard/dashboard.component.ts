import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category';
import { Task } from '../../shared/models/task';
import { TasksService } from '../../shared/services/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public categories: Category[];
  public tasks: Task[];
  public taskItems: { [name: number]: Task[] } = {};
  public showCreateCategoryForm = false;
  public newCategory: Category;
  public showTaskForm: boolean = false;
  public taskEdit: Task;
  public actionTitle: string = '';
  public showTitleEdit: boolean = false;
  public editCategory: Category;

  constructor(
    private categoriesService: CategoriesService,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.categoriesService.getCategories()
      .subscribe(data => {
        this.categories = data;
        this.getTasks();
      }, error => {
        console.log(error);
      });
  }

  public getTasks(): void {
    this.tasksService.getTasks()
      .subscribe(res => {
        this.tasks = res;
        this.categories.forEach(category => {
          this.taskItems[category.id] = this.tasks.filter(task => task.categoryId === category.id);
        });
      }, error => {
        console.log(error);
      });
  }

  public addNewCategory(title: string): void {
    const id = Math.max(...this.categories.map(item => item.id)) + 1;
    this.showCreateCategoryForm = false;
    this.newCategory = {
      title,
      id
    };
    this.categoriesService.addCategory(this.newCategory).subscribe(res => {
      this.getCategories();
    });
  }

  public deleteCategory(id: number): void {
    this.categoriesService.deleteCategory(id).subscribe(res => {
      this.getCategories();
    }, error => {
      console.log(error);
    });
  }

  public getConnectionList(): string[] {
    return this.categories.map(item => `${item.id}`);
  }

  public dropTask(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updateTaskCategory(event.container.data[event.currentIndex], event.container.id);
  }

  public updateTaskCategory(tasks, categoryId) {
    tasks.categoryId = categoryId;
    this.tasksService.editTask(tasks).subscribe(res => {
      console.log('Task change column');
    });
  }

  public dropCategory(event: CdkDragDrop<Category[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public editForm(task: Task): void {
    this.taskEdit = task;
    this.actionTitle = 'update';
  }

  public updateTask(task: Task): void {
    this.tasksService.editTask(task)
      .subscribe(res => {
        this.showTaskForm = false;
        this.getTasks();
      }, (err) => {
      console.log(err);
      });
  }

  public newFormTask(id: number): void {
    this.taskEdit = {
      title: '',
      description: '',
      categoryId: id
    };
    this.actionTitle = 'create';
  }

  public deleteTask(task): void {
    this.tasksService.deleteTask(task.id)
      .subscribe(res => {
        this.getTasks();
      });
  }

  public addNewTask(task) {
    const taskId = Math.max(...this.tasks.map(item => item.id)) + 1;
    this.showTaskForm = false;
    const newTask = {
      title: task.title,
      description: task.description,
      categoryId: task.categoryId,
      id: taskId
    };
    this.tasksService.createTask(newTask)
      .subscribe(res => {
        this.getTasks();
      });
  }

  edit(category) {
    this.editCategory = category;
  }

  public changeTitle(data) {
    this.editCategory = null;
    this.categoriesService.changeCategoryTitle(data)
      .subscribe(res => {
        console.log('Title has been changed');
      });
  }

}
