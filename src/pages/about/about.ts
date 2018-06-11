import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SensorService } from '../../shared/sensor.service';
import { Sensor } from '../../shared/sensor.model';
import { Measure } from '../../shared/measue.model';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  sensors: Sensor[] = [];

  constructor(public navCtrl: NavController, private sensorService: SensorService) { }

  getSensors() {
    this.sensorService.getSensors()
      .subscribe(sensors => {
        this.sensors = sensors;
      });
  }

}
