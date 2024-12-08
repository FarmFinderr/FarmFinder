import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8880/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  createUser(formData: FormData): Observable<any> {
    console.log(formData);
    
    return this.http.post<any>(`${this.apiUrl}/create`, formData, {
      responseType: 'text' as 'json',
  });
  
  }

  updateUser(userId: number, updatedUser: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.apiUrl}/${userId}`, updatedUser);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
  AddPhoto(image:any){
    const formData = new FormData();
    formData.append('image', image);    
    return this.http.post(`http://localhost:8880/api/upload`,formData);
    
    
}
search(searchQuery: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl+"/search"}?search=${searchQuery}`);
}
}
