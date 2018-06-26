import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';


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
  timestamp: string[] = [];
  data: number[] = [];
  data2: number[] = []

  constructor(public navCtrl: NavController, private sensorService: SensorService) {

  }

  getMeasure(sensor: Sensor, startDate = null, endDate = null) {
    this.sensorService.getMeasure(sensor.sensorId, startDate, endDate)
      .subscribe(res => {
        this.measures = res;
      });
  }

  getTimestamp(measures) {
    for (let index = 0; index < measures.length; index++) {
      this.timestamp[index] = measures[index].timeStamp;
    }
  }

  getMeasureData(measures) {
    this.data = [];
    for (let index = 0; index < measures.length; index++) {
      this.data[index] = measures[index].sensorData;
    }
    return this.data;
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
  }
}