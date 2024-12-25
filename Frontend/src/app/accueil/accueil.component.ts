import { UserService } from './../services/user/user.service';
import { Post } from './../models/post.model';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
import { ChatsComponent } from './chats/chats.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AddpostComponent } from './addpost/addpost.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EventslistComponent } from './eventslist/eventslist.component';
import { ModalAddPostComponent } from './modal-add-post/modal-add-post.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { imageOverlay } from 'leaflet';
import { OpenmapComponent } from '../accueil/openmap/openmap.component';
import { MapleafletComponent } from '../accueil/mapleaflet/mapleaflet.component';
import { ChatbotService } from '../services/chat/chatbot.service';
import { CommentService } from '../services/comment/comment.service';
import { ReactionService } from '../services/reaction/reaction.service';
import { tap, catchError, timestamp } from 'rxjs/operators';
import { AddpostService } from '../services/post/addpost.service';
import { ChatUsersService } from '../services/chat/chat-users.service';
import { EventService } from '../services/event/event.service';
import { Participation } from '../models/Participation.model';
import { event } from '../models/event.model';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { RegistrationService } from '../services/paticipation/registration.service';

import { FormsModule } from '@angular/forms';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { MatDialog } from '@angular/material/dialog';





@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [ChatsComponent,OpenmapComponent,MapleafletComponent,FormsModule,CommonModule,MapComponent,GoogleMapsModule,AddpostComponent ,ModalAddPostComponent,EventslistComponent,SidebarComponent,RouterOutlet, RouterLink, RouterLinkActive,NavbarComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent  implements OnInit {


  postslist :any[]= [];
  user:any=null;
  Post = {
    price: 0,
    userId: '',
    description: '',
    date:null,
    localisation:'',
    air:0,
    defaut:'',
    etat:''};
    userMessage: string = '';
    commentMessage:string='';
    chatHistory: { sender: string; text: string }[] = [];

  isLoading: boolean = true;
  isModalMessage = false;
  errorMessage: string | null = null;
  //userId='1';
  userId: string =''; 
  newItem: Post = {
    price: 0,
    userId: '',
    description: '',
    date: null,
    localisation: '',
    air: 0,
    defaut: '',
    etat: '',
    type:''

  };
  senderId: number = 1;
  receiverId: number = 2;
  messageContent: string = '';
  selectedReaction: string = '../../assets/accueil/alike.png';

  chatslist:any[]= [];
  socketClient:any= null;
  chats={
      id: 0,
      sender: '',
      receiver: '',
      content: '',
      timestamp: ''

  }
  // openOverlay(userId: number | undefined) {
  //   const dialogRef = this.dialog.open(ChatsComponent, {
      
  //     data: { message: 'Hello from Parent Component!', userId: 123 },
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('Dialog closed', result);
  //   });
  // }
  openOverlay(userId: number | undefined) {
    console.log('receiverId:', userId);

    if (userId) {
      this.dialog.open(ChatsComponent, {
        data: { receiverId: userId }
      });
    }
  }
  getEvents(): void {
    this.EventService.getEvents().subscribe({
      next: (data) => {
        console.log("service",data);
        
        this.events = data;

      },
      error: (err) => {
        console.log("error : ", err);
      }
    })
  }





  curr_users!: Participation[];
  currentItem: Post | null = null;
  constructor(private dialog: MatDialog,private EventService: EventService, private registrationService:RegistrationService,private Postservice: PostService,private Chatbotservice: ChatbotService,private commentservice: CommentService,private userservice:UserService,
    private ReactionService:ReactionService,private router: Router,    private AddpostService: AddpostService, private ChatUsersService: ChatUsersService

  ) {

  }
  openMessage(senderID: any, receiverID: any) {
    this.isModalMessage = true;
    this.senderId = senderID;
    this.receiverId = receiverID;
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
  CloseMessage() {
    this.isModalMessage = false;
  }


  sendMessage() {
    console.log("dans send message");

    if (this.userMessage.trim()) {
      this.chatHistory.push({ sender: 'user', text: this.userMessage });
      console.log("this.userMessage",this.chatHistory);

      this.Chatbotservice.sendMessage(this.userMessage).subscribe((response) => {
        this.chatHistory.push({ sender: 'bot', text: response.response });
        console.log("response",this.chatHistory);

      });

      this.userMessage = '';
    }
  }


  openImageInNewWindow(imagePath: string): void {
    const fullPath = 'http://localhost:5000' + imagePath;
    window.open(fullPath, '_blank');
  }


  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') ?? ''; 
    this.getEvents();
    console.log("userid",this.userId)
    this.getuser(this.userId);
    this.getChats();
    this.fetchPosts();
    this.AddpostService.postAdded$.subscribe(() => {
      this.fetchPosts();
    });
    // this.connectWebSocket();
    // // Correctly formatted WebSocket URL
    // let ws = new SockJS('http://localhost:8088/ws');
    // this.socketClient = Stomp.over(ws);

    // // Connect the WebSocket client
    // this.socketClient.connect({}, () => {
    //     console.log("Connected to WebSocket...");
    // }, (error: any) => {
    //     console.error("WebSocket connection error:", error);
    // });
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

  // Handle received messages
  onMessageReceived(message: any): void {
    const receivedMessage = JSON.parse(message.body);
    this.chatslist.push({
      sender: receivedMessage.sender,
      content: receivedMessage.content,
      receiver: receivedMessage.receiver,
      timestamp: receivedMessage.timestamp
    });
    console.log('Received message:', receivedMessage);
  }

  // Send a message to the WebSocket server
  sentMessage(): void {
    if (this.userMessage.trim()) {
      // Prepare the message payload
      const message = {
        sender: this.senderId,
        receiver: this.receiverId,
        content: this.userMessage
      };

      // Send the message to the backend via WebSocket
      this.socketClient.send('/app/chat.sendMessage', {}, JSON.stringify(message));
      console.log('Message sent:', message);

      // Clear the message input after sending
      this.userMessage = '';
    }
  }
      getuser(userId:string):void{
        this.user=this.userservice.getUser(userId);

        this.userservice.getUser(userId).subscribe({
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

    fetchPosts(): void {
    this.Postservice.getPosts().subscribe({
      next: (data) => {
        console.log('Fetched posts:', data);  // Log the response
        this.postslist = data;  // Store the fetched items
        console.log('postslist',this.postslist);
        this.isLoading = false;  // Hide the loading indicator
      },
      error: (err) => {
        console.error('Error fetching posts:', err);  // Log the error
        this.errorMessage = 'Failed to load posts';  // Set the error message
        this.isLoading = false;  // Hide the loading indicator
      },
    });
  }

  getUserReaction(post: any): string | null {
    for (let i = 0; i < post.reactions.length; i++) {
      if (post.reactions[i].userId == this.userId) {
        return post.reactions[i].reactionType;
      }
    }
      return 'noreaction';
  }


  getReactionImage(reactionType: string ): string {
    console.log(reactionType);
    if(reactionType=='noreaction'){
      return '../../assets/accueil/alike.png';
    }
    else{
      const reactionImages: { [key: string]: string } = {
        like: '../../assets/accueil/like.png',
        love: '../../assets/accueil/heart.png',
        care: '../../assets/accueil/care.png',
        haha: '../../assets/accueil/hah.png',
        wow: '../../assets/accueil/woh.png',
        sad: '../../assets/accueil/triste.png',
        angry: '../../assets/accueil/angre.png',
      };
      return reactionImages[reactionType];

    }

  }



  loadItems(): void {
    this.Postservice.getPosts().subscribe((data) => (this.postslist = data));
  }
  isLoader(): boolean {
    return this.isLoading;
  }

  addComment(postID: any) {
    console.log(postID);
    this.commentservice.createComment({ postId: postID, userId: this.userId, text: this.commentMessage })
      .pipe(
        tap((response) => {
          if (response) {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'Commentaire ajouté avec succès !',
            });
            this.commentMessage='';
            this.fetchPosts();
          }
        }),
        catchError((error) => {
          console.error('Erreur lors de l\'ajout du commentaire:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'ajout du commentaire.',
          });
          return of(null);
        })
      )
      .subscribe();
  }


  addReaction(postId:any,type:string,reactionimg:string){
    console.log("postid",postId,type);
    const reaction = {
      postId: postId,
      userId: this.userId,
      reactionType: type,
    };

    this.ReactionService.createReaction(reaction).subscribe(
      (response) => {
        console.log('Réaction ajoutée:', response);
        //this.selectedReaction = reactionimg;
        this.fetchPosts();


      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  

  events:any[]= [];

   showDetails = false;
   isModalOpen = false;
   isModalOpenDetailsEvent = false;
   eventDetails: any = null;
   isModalOpenIA = false;

openModalIA() {
  this.isModalOpenIA = true;
}


closeModalIA() {
  this.isModalOpenIA = false;
}


PostComments:any[] = [];
formatDate(date: string): string {
  const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (diff < 60) return 'il y a quelques secondes';
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} minutes`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} heures`;
  return `il y a ${Math.floor(diff / 86400)} jours`;
}


  openModal(post:any) {
    this.isModalOpen = true;
    console.log("modal opened ");
    this.PostComments = post;
  }

  closeModal() {
    this.isModalOpen = false;
    this.PostComments=[];
    console.log("modal closed ");

  }

     showDetailsMap: { [key: string]: boolean } = {};

     toggleDetails(postId: string): void {
      console.log("post id",postId)
       this.showDetailsMap[postId] = !this.showDetailsMap[postId];
     }


  //  openModalDetailsEvent(event:any) {
  //   this.eventDetails = event;
  //   this.isModalOpenDetailsEvent = true;
  //   console.log("ModalDetailsEvent opened ");
  // }
  value  = 0 ;
  RegisterForEvent() {
    const formData = new FormData();

    formData.append("price", this.value.toString());
    formData.append("person_id", this.user.id.toString());
    formData.append("event_id", this.SelectedEvent.id.toString());

    this.registrationService.register(formData).subscribe({
        next: (response) => {
          this.isModalOpenDetailsEvent=false;
          this.value=0;
          Swal.fire({
                    icon: 'success',
                    title: 'You registry seccfully for this event!',
                    showConfirmButton: false,
                    timer: 3000,
                    width: '300px', 
                    padding: '10px', 
                    customClass: {
                    title: 'swal-title', 
                     popup: 'swal-popup' 
                    }
                  });
        },
        error: (err) => {
            console.error("Error during registration", err);
        }
    });
}
// get_user(id:string)
//   {
//     this.UserService.getUser(id).subscribe({
//       next:(res) =>{
//         this.Owner = res;
//         console.log(res);

//       },
//       error:(err)=>{
//         console.log("error getting user",err);

//       }
//     })
//   }
  
  Owner!: User;
  SelectedEvent: event = {
      id: -1,
      status: false,
      description: '',
      title: '',
      price: 0,
      owner_id: 0,
      photo: '',
      date_debut: '',
      date_fin: '',
      owner: this.Owner,
      users: [],
    }
  openModelDetailsEvent(Ev:event):void
    {
      this.eventDetails = Ev;
      this.SelectedEvent= Ev;
      const formData =  new FormData();
      formData.append("event_id",Ev.id?.toString());
      this.registrationService.getRegistratedUsers(Ev.id).subscribe({
        next:(res)=>{
          this.curr_users = res;
          
                      
        },
        error:(err)=>{
          console.log("error getting registrated users ",err);
  
        }
      })
  
      this.isModalOpenDetailsEvent= true;
  
    }
    

  closeModalDetailsEvent() {
    this.isModalOpenDetailsEvent = false;
    console.log("ModalDetailsEvent closed ");

  }

  isModalImagesOpen = false;
  modalImages: any[] = [];

  openImagesModal(images: any[], index: number) {
    if (images.length > 3) {
      this.modalImages = images;
      this.isModalImagesOpen = true;
    }
  }
  currentImageIndex = 0;


  closeModalImages() {
    this.isModalImagesOpen = false;
  }

  showNextImage() {
    if (this.currentImageIndex < this.modalImages.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.modalImages.length - 1;
    }
  }


}