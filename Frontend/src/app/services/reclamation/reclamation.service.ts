import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private baseUrl = 'http://localhost:5000/api/reclamations'; // Backend URL

  constructor(private http: HttpClient) {}

  // Add a new reclamation
  addReclamation(reclamation: { reclamation: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}`, reclamation);
  }

  // Get all reclamations
  getReclamations(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // Update a reclamation
  updateReclamation(id: string, reclamation: { reclamation: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, reclamation);
  }

  // Delete a reclamation
  deleteReclamation(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
