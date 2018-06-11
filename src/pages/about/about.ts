import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
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
            label: 'Sol',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            data: [45,55,65,75,55,45,75,45,45
                
            ],
            
        }, {
            label: 'Temp C',
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 1)',
            fill: false,
            data: [55,45,65,55,75,65,45,45,45
               
            ],
           
        }]
         
    
      },
      options: {
        scales: {
            yAxes: [{
                stacked: false
            }],
            xAxes:[{
              type:'time',
              time: {
                  unit: 'month',
                  displayFormats:{
                      'month': 'MMM YYYY'
                      }
                  }
              }]
        },
     
          
      
      }

  });
  }

}
