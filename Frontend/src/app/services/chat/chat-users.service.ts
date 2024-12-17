import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatUsersService {
  private apiUrl = 'http://localhost:8880';

  constructor(private http: HttpClient) {}

  // Get all chats
  getChats(): Observable<any[]> {
    console.log("wessim");
    
    return this.http.get<any[]>(`${this.apiUrl}/chats/read`);
  }

  sendMessage(message: {
    sender: number;
    receiver: number;
    content: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/chats/create`, message);
  }


 

  


  
  
}
