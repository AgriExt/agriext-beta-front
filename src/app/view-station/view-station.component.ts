// import { RestStationService } from './../rest-station.service';
import { Component, OnInit } from '@angular/core';

import { UploadFile } from './../../util/UploadFile';
import { csvToJson } from './../../util/CsvToJson';

@Component({
  selector: 'app-view-station',
  templateUrl: './view-station.component.html',
  styleUrls: ['./view-station.component.css']
})
export class ViewStationComponent implements OnInit {

  private uploadFile: UploadFile;
  private list: any;
  private mapDates: any;
  filterDate = null;

  constructor() {

    this.uploadFile = new UploadFile();
    this.list = null;
    this.mapDates = null;

    if (sessionStorage.getItem('csv-body')) {
      this.list = csvToJson(sessionStorage.getItem('csv-body'));
      this.mapDates = {};
      for (let obj of this.getBody()) {
        if (!this.mapDates[obj.data]) {
          this.mapDates[obj.data] = [];
          this.mapDates[obj.data].push(obj);
        }
        else {
          this.mapDates[obj.data].push(obj);
        }
      }
    }

  }


  public upload(fileInput) {
    let self = this;
    self.uploadFile.read(fileInput.files[0], [
      {
        event: "loadend",
        callback: function () {
          // console.log(fileInput.files[0]);
          sessionStorage.setItem('csv-body', this.result);
          sessionStorage.setItem('csv-name', fileInput.files[0].name);
          self.list = csvToJson(this.result);
          self.mapDates = {};

          for (let obj of self.getBody()) {
            if (!self.mapDates[obj.data]) {
              self.mapDates[obj.data] = [];
              self.mapDates[obj.data].push(obj);
            }
            else {
              self.mapDates[obj.data].push(obj);
            }
          }

        }
      }
    ]);
  }

  public getHead() {
    return Object.keys(this.list[0]).filter((key) => {
      return key !== "" && key !== "_id" && key !== "codigo_estacao" && key !== "data" && key !== "hora";
    });
  }

  private getBody() {
    return this.list.slice(1, this.list.length);
  }

  public isNan(item) {
    return !isNaN(parseFloat(this.avg(item))) && !isNaN(parseFloat(this.max(item))) && !isNaN(parseFloat(this.min(item)));
  }

  public avg(item) {
    let sum = 0;
    for (let x of this.getBody()) {
      sum += parseFloat(x[item]) || 0;
    }
    return (sum / (this.getBody().length - 1)).toFixed(2);
  }

  public min(item) {
    let smaller = parseFloat(this.getBody()[0][item]);
    for (let obj of this.getBody()) {
      if (parseFloat(obj[item]) < smaller) {
        smaller = parseFloat(obj[item]);
      }
    }
    return smaller.toFixed(2);
  }

  public max(item) {
    let larger = parseFloat(this.getBody()[0][item]);
    for (let obj of this.getBody()) {
      if (parseFloat(obj[item]) > larger) {
        larger = parseFloat(obj[item]);
      }
    }
    return larger.toFixed(2);
  }

  public getDates() {
    return Object.keys(this.mapDates).filter((key) => {
      return key !== "" && key !== "undefined";
    });
  }

  public mapDatesIsNotNull() {
    return this.mapDates !== null;
  }


  public filter(event) {
    // console.log(event);
    this.filterDate = this.mapDates[event];
    this.mapDates[event];
    // let div = document.querySelector('#graphics');
    // console.log(div);
    // div.innerHTML = '<app-graphics [datas]="filterDate" *ngIf="filterDate != null"></app-graphics>';
  }

  ngOnInit() { }

}
