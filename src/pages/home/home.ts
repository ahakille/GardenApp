import { Component, ViewChild } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { DatePipe } from '@angular/common';


import { SensorService } from '../../shared/sensor.service';
import { Sensor } from '../../shared/sensor.model';
import { Measure } from '../../shared/measue.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  measures: Measure[] = [];
  fukt1: Measure[] = [];
  fukt2: Measure[] = [];
  sol: Measure[] = [];
  temp: Measure[] = [];
  sensor: Sensor;

  constructor(public navCtrl: NavController, private sensorService: SensorService, private datePipe: DatePipe) {

  }

  doRefresh(refresher) {

    this.updateMeasure();

    setTimeout(() => {
      
      refresher.complete();
    }, 500);
  }

  updateMeasure() {
    this.sensorService.getMeasure(1, this.datePipe.transform(Date.now() - 11 * 60000, "yyyy-MM-dd HH:mm:ss"), this.datePipe.transform(Date.now(), "yyyy-MM-dd HH:mm:ss"))
      .subscribe(res => {
        this.fukt1 = res;

      });
    this.sensorService.getMeasure(2, this.datePipe.transform(Date.now() - 11 * 60000, "yyyy-MM-dd HH:mm:ss"), this.datePipe.transform(Date.now(), "yyyy-MM-dd HH:mm:ss"))
      .subscribe(res => {
        this.fukt2 = res;

      });
    this.sensorService.getMeasure(4, this.datePipe.transform(Date.now() - 11 * 60000, "yyyy-MM-dd HH:mm:ss"), this.datePipe.transform(Date.now(), "yyyy-MM-dd HH:mm:ss"))
      .subscribe(res => {
        this.sol = res;

      });
    this.sensorService.getMeasure(5, this.datePipe.transform(Date.now() - 11 * 60000, "yyyy-MM-dd HH:mm:ss"), this.datePipe.transform(Date.now(), "yyyy-MM-dd HH:mm:ss"))
      .subscribe(res => {
        this.temp = res;

      });
  };
  ionViewDidEnter(){
    this.updateMeasure();
   }
  getMeasure(sensor: Sensor, startDate, endDate) {
    console.log(sensor)
    this.sensorService.getMeasure(sensor.sensorId, startDate, endDate)
      .subscribe(res => {
        this.measures = res;

      });
    return this.measures;
  };



}