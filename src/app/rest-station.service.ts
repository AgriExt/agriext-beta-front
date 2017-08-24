import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RestStationService {

  DataSet:any[] = [];
  
  static baseURL = '';
  constructor(private http:Http) {}

  getDataSet(name):void {
    this.http.get(`${RestStationService.baseURL}/name`)
    .map((response:Response) => {
      return this.DataSet = response.json();
    })
    .catch((error : Response) => Observable.throw(error));
  }
}
