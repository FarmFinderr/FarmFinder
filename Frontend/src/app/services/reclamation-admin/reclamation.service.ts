import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../../models/reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseUrl = 'http://localhost:5000/api/reclamations';

  constructor(private http: HttpClient) {}


  getReclamations(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  updateReclamation(id: string, reclamation: { reclamation: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, reclamation);
  }

  deleteReclamation(id: number) {
    return this.http.delete(`http://localhost:5000/api/reclamations/${id}`);
  }

}
