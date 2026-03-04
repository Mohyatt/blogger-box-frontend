import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Post } from '../data/post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `${environment.apiUrl}/v1/posts`;

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http
      .get<Post[] | { data: Post[] }>(this.baseUrl)
      .pipe(
        map((res: Post[] | { data: Post[] }) =>
          Array.isArray(res) ? res : res.data ?? []
        ),
        catchError((error) => {
          console.error('Error fetching posts', error);
          return of([]);
        })
      );
  }
}
