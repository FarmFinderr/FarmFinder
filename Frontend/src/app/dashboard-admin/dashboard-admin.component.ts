import { PostService } from './../services/post/post.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { RouterModule } from '@angular/router';
import { UserService } from './../services/user/user.service';
import { EventService } from '../services/event/event.service';
import { ReclamationService } from '../services/reclamation/reclamation.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [NavbarAdminComponent, RouterModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdmin implements OnInit {
  user: any = null;
  userId: string = '';
  isLoading: boolean = true;
  errorMessage: string | null = null;
  totalUsers: number | null = null;
  totalEvents: number | null = null;
  totalReclamations: number = 0;
  totalPosts: number = 0;
  usersByDay: any[] = [];
  postsByRegion: any[] = [];

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private reclamationService: ReclamationService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') ?? '';
    console.log('UserId:', this.userId);
    this.getuser(this.userId);
    this.getTotalUsers();
    this.getTotalEvents();
    this.getTotalReclamations();
    this.getTotalPosts();
    this.userService.getUsersCreatedByDay().subscribe(data => {
      this.usersByDay = data;
      this.createUserCreationChart();
    });

    this.postService.getPostsByLocation().subscribe(data => {
      this.postsByRegion = data;
      this.createLocationDistributionChart();
    });
  }


  createUserCreationChart() {
    const ctx = document.getElementById('userCreationChart') as HTMLCanvasElement;
    const gradient = ctx.getContext('2d')?.createLinearGradient(0, 0, 0, 400);
    if (gradient) {
      gradient.addColorStop(0, '#4d7c34'); 
      gradient.addColorStop(1, '#4d7c34'); 
    }

    new Chart(ctx, {
      type: 'bar', 
      data: {
        labels: this.usersByDay.map(item => item.date),
        datasets: [{
          label: 'Utilisateurs créés par jour',
          data: this.usersByDay.map(item => item.count),
          backgroundColor: gradient,
          borderColor: '#4d7c34',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Création d’utilisateurs par jour',
            font: { size: 18 },
            color: '#333'
          },
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
              color: '#333'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre d\'utilisateurs',
              color: '#333'
            },
            beginAtZero: true
          }
        }
      }
    });
  }

  getuser(userId:string):void{
    this.user=this.userService.getUser(userId);

    this.userService.getUser(userId).subscribe({
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
  

  createLocationDistributionChart() {
    const ctx = document.getElementById('locationDistributionChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut', 
      data: {
        labels: this.postsByRegion.map(item => item.location),
        datasets: [{
          label: 'Répartition des publications par localisation',
          data: this.postsByRegion.map(item => item.percentage),
          backgroundColor: ['#d1ff33', '#59bf0e', '#71bb73', '#fdb510', '#fef492','#257827'], 
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Répartition des publications par région',
            font: { size: 18 },
            color: '#333'
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });
  }
  







  getTotalEvents(): void {
    this.eventService.getTotalEvents().subscribe(
      (total) => {
        this.totalEvents = total;
        console.log('Total Events:', this.totalEvents);
      },
      (error) => {
        console.error('Error fetching total events:', error);
      }
    );
  }

  getTotalUsers(): void {
    this.userService.getTotalUsers().subscribe(
      (total: number) => {
        this.totalUsers = total;
      },
      (error) => {
        console.error('Error fetching total users:', error);
      }
    );
  }

  getTotalReclamations(): void {
    this.reclamationService.getTotalReclamations().subscribe(
      (response) => {
        this.totalReclamations = response.total;
        console.log('Total Reclamations:', this.totalReclamations);
      },
      (error) => {
        console.error('Error fetching total reclamations:', error);
      }
    );
  }

  getTotalPosts(): void {
    this.postService.getTotalPosts().subscribe(
      (response) => {
        this.totalPosts = response.total;
        console.log('Total Posts:', this.totalPosts);
      },
      (error) => {
        console.error('Error fetching total posts:', error);
      }
    );
  }


}
