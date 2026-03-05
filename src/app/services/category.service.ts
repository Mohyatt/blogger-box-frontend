import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Category } from '../data/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/v1/categories`;

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<Category[] | { data: Category[] }>(this.baseUrl)
      .pipe(
        map((res: Category[] | { data: Category[] }) =>
          Array.isArray(res) ? res : res.data ?? []
        ),
        catchError((error) => {
          console.error('Error fetching categories', error);
          return of([]);
        })
      );
  }
}

