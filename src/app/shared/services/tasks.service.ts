import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}tasks`);
  }

  public editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}tasks/${task.id}`, task);
  }

  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}tasks`, task);
  }

  public deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}tasks/${id}`);
  }
}
