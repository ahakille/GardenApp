import { DateTime } from "ionic-angular";

export interface Measure {
    measureId: number;
    timeStamp : DateTime;
    sensorId : number;
    sensorData : string;
}