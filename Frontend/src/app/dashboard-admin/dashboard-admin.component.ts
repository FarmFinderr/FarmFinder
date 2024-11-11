import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component'

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [NavbarAdminComponent],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdmin implements OnInit {

  public config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      datasets: [{
        label: 'Registred Users',
        data: [65, 59, 80, 81, 56, 55, 40, 75, 62, 85, 90, 100], // Example values for each month
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // January
          'rgba(255, 159, 64, 0.2)', // February
          'rgba(255, 205, 86, 0.2)', // March
          'rgba(75, 192, 192, 0.2)', // April
          'rgba(54, 162, 235, 0.2)', // May
          'rgba(153, 102, 255, 0.2)', // June
          'rgba(201, 203, 207, 0.2)', // July
          'rgba(255, 99, 132, 0.2)', // August
          'rgba(255, 159, 64, 0.2)', // September
          'rgba(255, 205, 86, 0.2)', // October
          'rgba(75, 192, 192, 0.2)', // November
          'rgba(54, 162, 235, 0.2)'  // December
        ],
        borderColor: [
          'rgb(255, 99, 132)', // January
          'rgb(255, 159, 64)', // February
          'rgb(255, 205, 86)', // March
          'rgb(75, 192, 192)', // April
          'rgb(54, 162, 235)', // May
          'rgb(153, 102, 255)', // June
          'rgb(201, 203, 207)', // July
          'rgb(255, 99, 132)', // August
          'rgb(255, 159, 64)', // September
          'rgb(255, 205, 86)', // October
          'rgb(75, 192, 192)', // November
          'rgb(54, 162, 235)'  // December
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };


  public config2: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: [
        'Tunis',
        'Beja',
        'Bizerte',
        'Sousse'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100, 40],
        backgroundColor: [
          'rgb(173, 255, 47)',   // Light Green
          'rgb(154, 205, 50)',   // Yellow Green
          'rgb(255, 165, 0)',    // Orange
          'rgb(255, 215, 0)'     // Gold (optional replacement)

        ],
        hoverOffset: 4
      }]
    },
  };




  chart2: any
  chart: any;

  ngOnInit(): void {

    this.chart = new Chart('MyChart', this.config);
    this.chart2 = new Chart('MyChart2', this.config2);
  }
}
