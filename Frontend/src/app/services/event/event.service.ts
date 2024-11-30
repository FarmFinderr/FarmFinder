import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8888/events/';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer des données
  getPosts(): Observable<any[]> {
   // console.log(this.http.get<any[]>(this.apiUrl))
    return this.http.get<any[]>(`${this.apiUrl}/GetAll`);
  }

  addPost(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl,item);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Event/${id}`);
  }

  updatePost(id: string,item:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

}
