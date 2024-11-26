import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:8888/posts/';  

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer des données
  getPosts(): Observable<any[]> {
    console.log(this.http.get<any[]>(this.apiUrl))
    return this.http.get<any[]>(this.apiUrl);
  }

  addPost(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl,item);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updatePost(id: string,item:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

}
