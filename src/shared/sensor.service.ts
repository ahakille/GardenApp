import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Measure } from '../shared/measue.model'
import { Sensor } from '../shared/sensor.model'

@Injectable()
export class SensorService {
    constructor(private http: Http){}

    getSensors() {
        return <Observable<Sensor[]>>this.http
            .get('http://api.nppc.se/api/values/sensors')
            .map(res => this.extractData<Sensor[]>(res))
    }

    private extractData<T>(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json ? res.json() : null;
        return <T>(body && body.data || {});
    }
}