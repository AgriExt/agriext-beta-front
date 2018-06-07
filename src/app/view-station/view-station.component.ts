import { Component, OnInit, Self } from '@angular/core';
import { UploadFile } from './../../util/UploadFile';
import { csvToJson } from './../../util/CsvToJson';

@Component({
  selector: 'app-view-station',
  templateUrl: './view-station.component.html',
  styleUrls: ['./view-station.component.css']
})
export class ViewStationComponent implements OnInit {
  // static session = 0;
  // private nomes: String[] = [];
  private uploadFile: UploadFile;
  private list: any;
  private mapDates: any;
  filterDate = null;
  dado: any;
  constructor() {

    this.uploadFile = new UploadFile();
    this.list = null;
    this.mapDates = null;

    if (sessionStorage.getItem('csv-body')) {
      this.list = csvToJson(sessionStorage.getItem('csv-body'));
      this.mapDates = {};
      for (const obj of this.getBody()) {
        if (!this.mapDates[obj.data]) {
          this.mapDates[obj.data] = [];
          this.mapDates[obj.data].push(obj);
        } else {
          this.mapDates[obj.data].push(obj);
        }
      }
    }

  }


  public upload(fileInput) {
    const self = this;
    let csv: File = fileInput.files[0];
    self.uploadFile.read(csv, [
      {
        event: 'loadend',
        callback: function () {
          // self.nomes.push(csv.name);
          // console.log(self.nomes);
          // for (const n in self.nomes) {
          //   if (self.nomes[i] !== csv.name) {

          //   }
          // }
          // console.log(sessionStorage.length + '--' + ViewStationComponent.session);
              self.dado = this.result;
              console.log(self.dado);

              sessionStorage.setItem('csv-name', csv.name);
              sessionStorage.setItem('csv-body', this.result);
              // ViewStationComponent.session++;
              self.list = csvToJson(this.result);
              self.mapDates = {};
              for (const obj of self.getBody()) {
                if (!self.mapDates[obj.data]) {
                  self.mapDates[obj.data] = [];
                  self.mapDates[obj.data].push(obj);
                } else {
                  self.mapDates[obj.data].push(obj);
                }
              }
        }
      }
    ]);
  }

  public getHead() {
    return Object.keys(this.list[0]).filter((key) => {
      return key !== '' && key !== '_id' && key !== 'codigo_estacao' && key !== 'data' && key !== 'hora';
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
    for (const x of this.getBody()) {
      sum += parseFloat(x[item]) || 0;
    }
    return (sum / (this.getBody().length - 1)).toFixed(2);
  }

  public min(item) {
    let smaller = parseFloat(this.getBody()[0][item]);
    for (const obj of this.getBody()) {
      if (parseFloat(obj[item]) < smaller) {
        smaller = parseFloat(obj[item]);
      }
    }
    return smaller.toFixed(2);
  }

  public max(item) {
    let larger = parseFloat(this.getBody()[0][item]);
    for (const obj of this.getBody()) {
      if (parseFloat(obj[item]) > larger) {
        larger = parseFloat(obj[item]);
      }
    }
    return larger.toFixed(2);
  }

  public getDates() {
    return Object.keys(this.mapDates).filter((key) => {
      return key !== '' && key !== 'undefined';
    });
  }

  public mapDatesIsNotNull() {
    return this.mapDates !== null;
  }

  public filter(event) {
    this.filterDate = this.mapDates[event];
    // tslint:disable-next-line:no-unused-expression
    this.mapDates[event];
  }

  ngOnInit() { }

}
