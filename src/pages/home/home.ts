import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { SensorService } from '../../shared/sensor.service';
import { Sensor } from '../../shared/sensor.model';
import { Measure } from '../../shared/measue.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  showResetBtn = false;
  measures: Measure[] = [];
  measures1: Measure[] = [];
  sensor: Sensor;
  timestamp: string[] =[];
  data:number[]=[];
  data2:number[]=[] 

  constructor(public navCtrl: NavController ,private sensorService: SensorService) {
    
  }
  getMeasure(sensor : Sensor , startDate = null, endDate = null) {
    this.sensorService.getMeasure(sensor.sensorId, startDate, endDate)
      .subscribe(res => {
         this.measures = res;
       
      });
     

  }
  getTimestamp(measures)
  {
   for (let index = 0; index < measures.length; index++) {
     this.timestamp[index] = measures[index].timeStamp;
     
   }
  }
  getMeasureData(measures)
  {
    this.data = [];
    for (let index = 0; index < measures.length; index++) {
       this.data[index] = measures[index].sensorData;
    }
    return this.data;
  }
  showChart(){
    this.getTimestamp(this.measures)
    let data = this.getMeasureData(this.measures)
    console.log(data)
    this.showResetBtn = true;
    let data1 = this.getMeasureData(this.measures1)
  console.log(data1)
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
          labels: this.timestamp ,
          datasets: [{
            label: 'Fukt 1',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false,
            data: data
                
            ,
            
        }, {
            label: 'Fukt 2',
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 1)',
            fill: false,
            data: data1,
           
        }]
             
      },
      options: {
        scales: {
            xAxes: [{
              autoSkip:true,
                time: {
                    unit: 'day',
                    displayFormats: {
                      quarter: 'hh:mm a'
                  }
                }
            }]
        }
    }

  });

  }
 

  
  ionViewDidLoad() {
    this.sensor ={"sensorId":1,"sensorName":""};
    this.sensorService.getMeasure(1, null, null)
      .subscribe(res => {
         this.measures = res;
       
      });
      this.sensor ={"sensorId":2,"sensorName":""};
      this.sensorService.getMeasure(2, null, null)
        .subscribe(res => {
           this.measures1 = res;
         
        });
   
 
    
  }



}