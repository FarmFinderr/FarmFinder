import { Component, ChangeDetectorRef , OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { io, Socket } from 'socket.io-client'; // Import Socket.IO
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { ChatUsersService } from '../../services/chat/chat-users.service';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatsComponent } from '../chats/chats.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule,ChatsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent  {
  @Output() openAssistantModal = new EventEmitter<void>();
  
  

openModalIA() {
  this.openAssistantModal.emit();
}

isModalOpenIA = false;


closeModalIA() {
  this.isModalOpenIA = false;
}

isNotificationModalOpen = false;
  // Socket connection
 

  // Flag to manage Notification modal visibility
  

  // Notification data
  notificationData: any[] = [];

  // For real-time notification count
  notificationCount = this.notificationData.length;

  constructor(private ChatUsersService: ChatUsersService,private UserService:UserService,private dialog: MatDialog,private cdr: ChangeDetectorRef) {
    
    
  }
  receiverId: string = '';
  users:any=null;
  ngOnInit() {
    // Listen for incoming notifications
    this.receiverId = localStorage.getItem('userId') ?? ''; 
    this.getNotif();
    this.notificationCount = this.notificationData.length;
    this.connectWebSocket();
    this.loadUsers();
   
  }
  socketClient:any= null;
  connectWebSocket(): void {
        // Create a new SockJS instance connected to the WebSocket endpoint
        let ws = new SockJS('http://localhost:8088/ws');  // Adjust the URL as needed
        this.socketClient = Stomp.over(ws);
    
        // Connect the WebSocket client and subscribe to the topic
        this.socketClient.connect({}, (frame: any) => {
          console.log('Connected to WebSocket:', frame);
    
          // Subscribe to the public topic (or private topic based on your requirements)
          this.socketClient.subscribe('/topic/public', (message: any) => {
            this.onNotifReceived(message);
          });
    
        }, (error: any) => {
          console.error('WebSocket connection error:', error);
        });
      }
      
      onNotifReceived(message: any): void {
        const receivedMessage = JSON.parse(message.body);
        if (receivedMessage.receiver === this.receiverId) {
        this.notificationData.push({
          sender: receivedMessage.sender,
          content: receivedMessage.content,
          receiver: receivedMessage.receiver,
          timestamp: receivedMessage.timestamp
        });
        this.notificationCount++;
        this.playNotificationSound();
        console.log('Received message:', receivedMessage);
        
      }
        
      }
      playNotificationSound(): void {
        const sound = new Audio('../../../assets/sound.mp3');
        sound.play();
      }
      formatDate(date: string): string {
        const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        if (diff < 60) return 'il y a quelques secondes';
        if (diff < 3600) return `il y a ${Math.floor(diff / 60)} minutes`;
        if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} heures`;
        return `il y a ${Math.floor(diff / 86400)} jours`;
      }
      

  

  // Opens the Notification Modal
  openNotificationModal() {
    if(this.isNotificationModalOpen){
      this.isNotificationModalOpen = false;
    }else{
      this.isNotificationModalOpen = true;
    }
    
    this.notificationCount = 0;
  }
  deleteNotification(id: number): void {
  this.ChatUsersService.deleteNotification(id).subscribe({
    next: () => {
      console.log('Notification deleted successfully');
      
      // Update the notification data array
      this.notificationData = this.notificationData.filter(notif => String(notif.id) !== String(id));

      
      // Update the notification count
      this.notificationCount = this.notificationData.length;

      // Trigger Angular's change detection manually
      this.cdr.detectChanges();

      console.log('Updated notifications:', this.notificationData);
    },
    error: (err) => {
      console.error('Error deleting notification:', err);
    }
  });
}

  
  
  
  openOverlay(userId: number | undefined) {
      if (userId) {
        this.dialog.open(ChatsComponent, {
          data: { receiverId: userId }
        });
      }
    }

  // Closes the Notification Modal
  closeNotificationModal() {
    this.isNotificationModalOpen = false;
  }
  
  getNotif(): void {
  this.ChatUsersService.getNotif().subscribe({
    next: (data) => {
      console.log('Fetched notifications:', data);

      // Filter notifications for the logged-in user
      this.notificationData = data.filter((notif: any) => notif.receiver === this.receiverId);
      // this.notificationData.reverse();
      // Update the notification count based on the filtered notifications
      this.notificationCount = this.notificationData.length;
      
      console.log('notificationData', this.notificationData);
    },
    error: (err) => {
      console.error('Error fetching notifications:', err);
    },
  });
}

  loadUsers(): void {
    this.UserService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        
      },
    });
  }

  // Emit a message or notification to the server (for testing or sending notifications)
  
}