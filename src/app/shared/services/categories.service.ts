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
    return this.http.get<Category[]>(`${this.baseUrl}\categories`);
  }
}
