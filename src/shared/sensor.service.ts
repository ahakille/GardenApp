import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders} from '@angular/common/http'

import { Observable } from 'rxjs/observable';

import { Measure } from '../shared/measue.model'
import { Sensor } from '../shared/sensor.model'

@Injectable()
export class SensorService {
    constructor(private http: HttpClient){}

    getSensors(): Observable<Sensor[]> {
        return this.http.get<Sensor[]>('http://api.nppc.se/api/values/sensors');                  
    }        
}