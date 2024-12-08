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
          'rgb(173, 255, 47)',
          'rgb(158, 241, 54)',
          'rgb(143, 227, 61)',
          'rgb(128, 213, 68)',
          'rgb(113, 199, 75)',
          'rgb(98, 185, 82)',
          'rgb(138, 169, 76)',
          'rgb(169, 153, 70)',
          'rgb(204, 137, 63)',
          'rgb(239, 121, 56)',
          'rgb(255, 108, 48)',
          'rgb(255, 215, 0)' // December
        ],
        borderColor: [
          'rgb(173, 255, 47)',
          'rgb(158, 241, 54)',
          'rgb(143, 227, 61)',
          'rgb(128, 213, 68)',
          'rgb(113, 199, 75)',
          'rgb(98, 185, 82)',
          'rgb(138, 169, 76)',
          'rgb(169, 153, 70)',
          'rgb(204, 137, 63)',
          'rgb(239, 121, 56)',
          'rgb(255, 108, 48)',
          'rgb(255, 215, 0)'
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

export { NavbarAdminComponent };
