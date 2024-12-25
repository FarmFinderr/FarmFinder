import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Reclamation } from '../../models/reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseUrl = 'http://localhost:8880/api/reclamations';

  constructor(private http: HttpClient) {}


  getReclamations(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }



  deleteReclamation(id: string): Observable<any> {  // id should be string as MongoDB uses ObjectId
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}
