import { Post } from './../models/post.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post/post.service';
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
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';


import { FormsModule } from '@angular/forms';





@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [OpenmapComponent,MapleafletComponent,FormsModule,CommonModule,MapComponent,GoogleMapsModule,AddpostComponent ,ModalAddPostComponent,EventslistComponent,SidebarComponent,RouterOutlet, RouterLink, RouterLinkActive,NavbarComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent  implements OnInit {

  location: string = '';

   postslist :any[]= [];
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
  errorMessage: string | null = null;
  userId='1';
  newItem: Post = {
    price: 0,
    userId: '',
    description: '',
    date: null,  
    localisation: '',
    air: 0,
    defaut: '',
    etat: '',    
  };

  selectedReaction: string = '../../assets/accueil/alike.png';
 

 
  

  currentItem: Post | null = null;  
  constructor(private Postservice: PostService,private Chatbotservice: ChatbotService,private commentservice: CommentService,
    private ReactionService:ReactionService,private router: Router
  ) {

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
    this.fetchPosts();
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

            /*this.router.navigateByUrl('/accueil', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });*/
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

  comments = [
    {
      userImage: '../../assets/accueil/lyna.jpg',
      userName: ' Lyna moujehed',
      content: 'Super article, dispo !',
      date: '7 Février 2024'
    },
    {
      userImage: '../../assets/accueil/lyna.jpg',
      userName: ' Lyna moujehed',
      content: 'Super article, dispo !',
      date: '7 Février 2024'
    },
    {
      userImage: '../../assets/accueil/wassim.jpg',
      userName: 'Wassim saidani',
      content: 'prix negociable ??.',
      date: '8 Février 2024'
    },
    {
      userImage: '../../assets/sirineKahweji_ISETBizerte.jpg',
      userName: 'syrine syrina',
      content: 'Très bien expliqué !',
      date: '10 Février 2024'
    },
    {
      userImage: '../../assets/accueil/lyna.jpg',
      userName: ' Lyna moujehed',
      content: 'Super article, dispo !',
      date: '7 Février 2024'
    },
    {
      userImage: '../../assets/accueil/wassim.jpg',
      userName: 'Wassim saidani',
      content: 'prix negociable ??.',
      date: '8 Février 2024'
    },
    {
      userImage: '../../assets/sirineKahweji_ISETBizerte.jpg',
      userName: 'syrine syrina',
      content: 'Très bien expliqué !',
      date: '10 Février 2024'
    },
    {
      userImage: '../../assets/accueil/lyna.jpg',
      userName: ' Lyna moujehed',
      content: 'Super article, dispo !',
      date: '7 Février 2024'
    },
    {
      userImage: '../../assets/accueil/wassim.jpg',
      userName: 'Wassim saidani',
      content: 'prix negociable ??.',
      date: '8 Février 2024'
    },
    {
      userImage: '../../assets/sirineKahweji_ISETBizerte.jpg',
      userName: 'syrine syrina',
      content: 'Très bien expliqué !',
      date: '10 Février 2024'
    }
  ];

  events = [
    {
      id:1,
      image: '../../assets/accueil/event1.jpg',
      title: 'Ferme de 13 ha à Ain Draham',
      price: '5,400,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:2,
      image: '../../assets/accueil/event1.jpg',
      title: 'Terrain avec vue sur la mer Bizerte CapZbib',
      price: '1,200,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:3,
      image: '../../assets/accueil/event2.jpg',
      title: 'Petit Terrain a Tunis',
      price: '850,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:4,
      image: '../../assets/accueil/event1.jpg',
      title: 'Ferme de 13 ha à Ain Draham',
      price: '5,400,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:5,
      image: '../../assets/accueil/event2.jpg',
      title: 'Ferme avec vue sur la mer',
      price: '1,200,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:6,
      image: '../../assets/accueil/event3.jpg',
      title: 'Appartement au centre-ville',
      price: '850,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:7,
      image: '../../assets/accueil/event1.jpg',
      title: 'Ferme de 13 ha à Ain Draham',
      price: '5,400,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:8,
      image: '../../assets/accueil/event2.jpg',
      title: 'Villa avec vue sur la mer',
      price: '1,200,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:9,
      image: '../../assets/accueil/event3.jpg',
      title: 'Appartement au centre-ville',
      price: '850,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:10,
      image: '../../assets/accueil/event1.jpg',
      title: 'Ferme de 13 ha à Ain Draham',
      price: '5,400,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    },
    {
      id:11,
      image: '../../assets/accueil/event2.jpg',
      title: 'Villa avec vue sur la mer',
      price: '1,200,000 TND',
      description: "Belle opportunité d'acquisition d'une ferme agricole située dans la région verdoyante de Bizerte.",

    }
  ];

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

   toggleDetails() {
     this.showDetails = !this.showDetails;
   }

   openModalDetailsEvent(eventId:number) {
    this.eventDetails = this.events[eventId];
    this.isModalOpenDetailsEvent = true;
    console.log("ModalDetailsEvent opened ");
  }

  closeModalDetailsEvent() {
    this.isModalOpenDetailsEvent = false;
    console.log("ModalDetailsEvent closed ");

  }

}