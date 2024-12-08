import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = 'http://localhost:8880/commentaires';

  constructor(private http: HttpClient) {}

  createComment(data: { postId: string; userId: string; text: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, data);
  }

  getCommentsByPostId(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${postId}`);
  }

  updateComment(id: string, text: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { text });
  }

  deleteComment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
