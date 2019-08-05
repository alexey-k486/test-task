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
  public showCreateCategoryForm: boolean = false;

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
      });
  }

  public getTasks(): void {
    this.tasksService.getTasks()
      .subscribe(res => {
        this.tasks = res;
        this.categories.forEach(category => {
          this.taskItems[category.id] = this.tasks.filter(task => task.categoryId === category.id);
        });
      });
  }

  private getCategoryName(id: string): string {
    return this.categories.find(item =>
      item.id === Number(id)).title;
  }

  public drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  public addNewCategory(title: string): void {
    const id = Math.max(...this.categories.map(item => item.id)) + 1;
    this.showCreateCategoryForm = false;
    this.categories.push({
      title,
      id
    });
    this.taskItems[id] = [];
  }

  public keyValueSort(): number {
    return 0;
  }

}
