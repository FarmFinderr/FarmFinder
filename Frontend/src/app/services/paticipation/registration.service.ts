import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'http://localhost:8888/events/';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer des données
  getRegistratedUsers(id:any): Observable<any[]> {
   // console.log(this.http.get<any[]>(this.apiUrl))
    return this.http.get<any[]>(`${this.apiUrl}UsersRegistrated/${id}`);
  }

  register(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}EventResgistration/`,item);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}Event/${id}`);
  }

  updateEvent(id: string,item:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

}
