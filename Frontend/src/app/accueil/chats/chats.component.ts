import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { ChatUsersService } from '../../services/chat/chat-users.service';
import { tap, catchError, timestamp } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user/user.service';
// import { EmojiModule} from '@ctrl/ngx-emoji-mart/ngx-emoji';
// import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent {
  isLoading: boolean = true;
  userMessage: string = '';
  errorMessage: string | null = null;
  chatslist:any[]= [];
  socketClient:any= null;
  senderId: string =''; 
  receiverId: string = '';
  
 
  chats={
      id: 0,
      sender: '',
      receiver: '',
      content: '',
      timestamp: ''

  }
  user:any=null;
  messageContent: string = '';
  ngOnInit(): void {
    this.senderId = localStorage.getItem('userId') ?? ''; 
    this.getChats();
    this.connectWebSocket();
    this.getuser();
    setTimeout(() => this.scrollToBottom(), 200);

  }
  @ViewChild('chatContainer') private chatContainer: ElementRef | undefined;
constructor( private ChatUsersService: ChatUsersService,private userservice:UserService, public dialogRef: MatDialogRef<ChatsComponent>,@Inject(MAT_DIALOG_DATA)  public data: { receiverId: string }) {
  this.receiverId = this.data.receiverId; // Assign receiverId here
}
showEmojiPicker: boolean = false;

toggleEmojiPicker(): void {
  this.showEmojiPicker = !this.showEmojiPicker;
  console.log('Emoji Picker State:', this.showEmojiPicker); // Debugging line
}


addEmoji(event: any): void {
  const emoji = event.emoji?.native; // Safely access emoji property
  if (emoji) {
    console.log('Selected Emoji:', emoji); // Debugging line
    this.userMessage += emoji; // Append emoji
    this.showEmojiPicker = false; // Close the picker
  } else {
    console.error('Invalid Emoji Event:', event);
  }
}



  

scrollToBottom(): void {
  setTimeout(() => {
    if (this.chatContainer && this.chatContainer.nativeElement) {
      const element = this.chatContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
      // Apply smooth scroll behavior
      element.style.scrollBehavior = 'smooth';
    }
  }, 0);  // Wait until the next call stack to trigger scrolling
}


onMessageReceived(message: any): void {
  const receivedMessage = JSON.parse(message.body);
  this.chatslist.push({
    sender: receivedMessage.sender,
    content: receivedMessage.content,
    receiver: receivedMessage.receiver,
    timestamp: receivedMessage.timestamp
  });
  console.log('Received message:', receivedMessage);
  
  // Scroll to the bottom after receiving a message
  this.scrollToBottom();
}


getChats(): void {
    this.ChatUsersService.getChats().subscribe({
      next: (data) => {
        console.log('Fetched chats:', data);
        this.chatslist = data;
        console.log('chatslist',this.chatslist);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching chats:', err);
        this.errorMessage = 'Failed to load chats';
        this.isLoading = false;
      },
    });
  }
  formatDate(date: string): string {
    const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (diff < 60) return 'il y a quelques secondes';
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} minutes`;
    if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} heures`;
    return `il y a ${Math.floor(diff / 86400)} jours`;
  }
  // onMessageReceived(message: any): void {
  //   const receivedMessage = JSON.parse(message.body);
  //   this.chatslist.push({
  //     sender: receivedMessage.sender,
  //     content: receivedMessage.content,
  //     receiver: receivedMessage.receiver,
  //     timestamp: receivedMessage.timestamp
  //   });
  //   console.log('Received message:', receivedMessage);
  
  //   // Scroll to the bottom after receiving a message
  //   this.scrollToBottom();
  // }
  
  
  sentMessage(): void {
    if (this.userMessage.trim()) {
      const message = {
        sender: this.senderId,
        receiver: this.data.receiverId,
        content: this.userMessage
      };
  
      // Send the message to the backend via WebSocket
      this.socketClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
      console.log('Message sent:', message);
  
      // Clear the message input after sending
      this.userMessage = '';
  
      // Scroll to the bottom after sending a message
      this.scrollToBottom();
    }
  }
  

  connectWebSocket(): void {
      // Create a new SockJS instance connected to the WebSocket endpoint
      let ws = new SockJS('http://localhost:8088/ws');  // Adjust the URL as needed
      this.socketClient = Stomp.over(ws);
  
      // Connect the WebSocket client and subscribe to the topic
      this.socketClient.connect({}, (frame: any) => {
        console.log('Connected to WebSocket:', frame);
  
        // Subscribe to the public topic (or private topic based on your requirements)
        this.socketClient.subscribe('/topic/public', (message: any) => {
          this.onMessageReceived(message);
        });
  
      }, (error: any) => {
        console.error('WebSocket connection error:', error);
      });
    }
    

    closeDialog() {
      this.dialogRef.close();
    }

    getuser():void{
      this.user=this.userservice.getUser(this.data.receiverId);

      this.userservice.getUser(this.data.receiverId).subscribe({
        next: (data) => {
          console.log('Fetched user:', data)
          this.user = data;
          console.log('user act',this.user);
          this.isLoading = false; 
        },
        error: (err) => {
          console.error('Error fetching user:', err);  
          this.errorMessage = 'Failed to load user';  
          this.isLoading = false;  
        },
      });

    }
    
    

}