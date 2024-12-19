import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private baseUrl = 'http://localhost:5050/api/reclamations/';

  constructor(private http: HttpClient) {}

  // Add a new reclamation with image support
  addReclamation(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, formData);
  }


}
