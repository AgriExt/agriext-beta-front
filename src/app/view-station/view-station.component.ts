import { RestStationService } from './../rest-station.service';
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
  private list: Array<any>;

  constructor() {
    this.uploadFile = new UploadFile();
    this.list = null;
  }


  public upload(fileInput) {
    let self = this;
    this.uploadFile.read(fileInput.files[0], [
      {
        event: "loadend",
        callback: function () {
          self.list = csvToJson(this.result);
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

  public avg(item) {
    let som = 0;
    for (let x of this.getBody()) {
      som += parseFloat(x[item]) || 0;
    }
    return (som / (this.getBody().length - 1)).toFixed(2);
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

  ngOnInit() { }

}
