import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

import { SensorService } from '../../shared/sensor.service';
import { Sensor } from '../../shared/sensor.model';
import { Measure } from '../../shared/measue.model';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;
  sensors: Sensor[] = [];
  measures: Measure[] = [];
  showResetBtn = false;
  lineChart: any;
  lineChart2:any;
  measures1: Measure[] = [];
  measures2: Measure[] = [];
  sensor: Sensor;
  timestamp: string[] = [];
  data: number[] = [];
  data2: number[] = []

  constructor(public navCtrl: NavController, private sensorService: SensorService) { }

  doRefresh(refresher) {

    this.showChart();

    setTimeout(() => {
      
      refresher.complete();
    }, 500);
  }
  getSensors() {
    this.sensorService.getSensors()
      .subscribe(res => {
        this.sensors = res;

      });
  }

  getMeasure(sensor: Sensor, startDate = null, endDate = null) {
    this.sensorService.getMeasure(sensor.sensorId, startDate, endDate)
      .subscribe(res => {
        this.measures = res;
      });
  }

  getTimestamp(measures) {
    for (let index = 0; index < measures.length; index++) {
      this.timestamp[index] = "";
      //measures[index].timeStamp;
    }
  }

  getMeasureData(measures) {
    this.data = [];
    for (let index = 0; index < measures.length; index++) {
      this.data[index] =100 - (measures[index].sensorData/10);
    }
    return this.data;
  }
  getTempData(measures2) {
    let data = [];
    for (let index = 0; index < measures2.length; index++) {
      data[index] = measures2[index].sensorData;
    }
    return data;
  }
  
  showChart() {
    this.ionViewDidLoad();
    this.getTimestamp(this.measures)
    let data = this.getMeasureData(this.measures)
    console.log(data)
    
    this.showResetBtn = true;
    let data1 = this.getMeasureData(this.measures1)
    console.log(data1)
    let data2 = this.getTempData(this.measures2)
    console.log(data2)
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.timestamp,
        datasets: [{
          label: 'Fukt 1',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
          data: data,
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
            autoSkip: true,
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
    this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {
      type: 'line',
      data: {
        labels: this.timestamp,
        datasets: [{
          label: 'Temperatur',
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 1)',
          fill: false,
          data: data2,
        }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true,
            
          }]
        }
      }
    });
  }

  ionViewDidLoad() {
    this.sensor = { "sensorId": 1, "sensorName": "" };
    this.sensorService.getMeasure(1, null, null)
      .subscribe(res => {
        this.measures = res;
      });

    this.sensor = { "sensorId": 2, "sensorName": "" };
    this.sensorService.getMeasure(2, null, null)
      .subscribe(res => {
        this.measures1 = res;
      });
      
      this.sensorService.getMeasure(5, null, null)
      .subscribe(res => {
        this.measures2 = res;
      });
  }
}
 


