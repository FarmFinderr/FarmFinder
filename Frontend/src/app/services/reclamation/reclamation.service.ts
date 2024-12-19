import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private baseUrl = 'http://localhost:8880/api/reclamations/';

  constructor(private http: HttpClient) {}

  addReclamation(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, formData);
  }

  getTotalReclamations(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.baseUrl}/total`);
  }


}
