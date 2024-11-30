import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private baseUrl = 'http://localhost:5000/reactions'; 

  constructor(private http: HttpClient) {}

  createReaction(reaction: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, reaction);
  }

  getReactionsByPostId(postId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/post/${postId}`);
  }

  getUserReaction(postId: string, userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/post/${postId}/user/${userId}`);
  }

  deleteReaction(reactionId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${reactionId}`);
  }

  updateReaction(reactionId: string, updatedReaction: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${reactionId}`, updatedReaction);
  }
}
