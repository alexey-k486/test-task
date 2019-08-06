import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}categories`);
  }

  public addCategory(data: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}categories`, data);
  }

  public deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${this.baseUrl}categories/${id}`);
  }

  public changeCategoryTitle(data): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}categories/${data.id}`, data);
  }
}
