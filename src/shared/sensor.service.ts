import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/observable';

import { Measure } from '../shared/measue.model'
import { Sensor } from '../shared/sensor.model'

@Injectable()
export class SensorService {
    constructor(private http: HttpClient){}

    getSensors(): Observable<Sensor[]> {
        return this.http.get<Sensor[]>('https://api.nppc.se/api/values/sensors');                  
    }
    
    getMeasure(sensorId: Number, startDate: string, endDate:string): Observable<Measure[]> {
        return this.http.get<Measure[]>('https://api.nppc.se/api/values/sensor/time/' + sensorId + '?startTime=' + startDate + '&endTime=' + endDate);
    }
}