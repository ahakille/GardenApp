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

  sensors: Sensor[] = [];
  measures: Measure[] = [];
  showResetBtn = false;

  constructor(public navCtrl: NavController, private sensorService: SensorService) { }

  getSensors() {
    this.sensorService.getSensors()
      .subscribe(res => {
        this.sensors = res;
        this.showResetBtn = true;
      });
  }

  hideSensors() {
    this.sensors = [];
    this.showResetBtn = false;
  }

  //TODO Remove hardcoded Date parameters
  getMeasure(sensor: Sensor, startDate = null, endDate = null) {
    this.sensorService.getMeasure(sensor.sensorId, startDate, endDate)
      .subscribe(res => {
        this.measures = res;
      });
  }
}
