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
}
