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
    
    
    return this.http.get<any[]>(`${this.apiUrl}/chats/read`);
  }
  getNotif(): Observable<any[]> {
    
    
    return this.http.get<any[]>(`${this.apiUrl}/chats/notifications`);
  }
  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/chats/notifications/delete/${id}`);
  }

  sendMessage(message: {
    sender: number;
    receiver: number;
    content: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/chats/create`, message);
  }


 

  


  
  
}
