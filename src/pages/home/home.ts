import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  constructor(public navCtrl: NavController) {
    
  }

  ionViewDidLoad() {
 
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
      type: 'line',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
            label: 'Fukt 1',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            data: [45,55,65,75,55,45,75
                
            ],
            
        }, {
            label: 'Fukt 2',
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 1)',
            fill: false,
            data: [55,45,65,55,75,65,45
               
            ],
           
        }]
         
    
      }

  });
  }

}

