import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8880/events/';
  console: any;

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer des données
  getEvents(): Observable<any[]> {
   // console.log(this.http.get<any[]>(this.apiUrl))
    return this.http.get<any[]>(`${this.apiUrl}GetAll`);
  }


  getEvent(id:any): Observable<any> {
     return this.http.get<any>(`${this.apiUrl}Event/${id}`);
   }

  addEvent(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}EventCreation/`,item);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}Event/${id}`);
  }

  updateEvent(id: string,item:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }
  search(searchQuery: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl+"/search"}?search=${searchQuery}`);
  }

}
