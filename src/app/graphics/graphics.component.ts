import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html'
})
export class GraphicsComponent implements OnInit {
  @Input() datas;
  listCharts;

  constructor() {}

  ngOnChanges() {
    let head = Object.keys(this.datas[0]).filter(function (title) {
      return title != "codigo_estacao" && title != "data" && title != "_id" && title != "" && title != "hora";
    });

    this.listCharts = [];

    for (let title of head) {
      let obj = {};
      obj['title'] = title;
      obj['data'] = [];

      for (let data of this.datas) {
        obj['data'].push({
          "column-1": parseFloat(data[title]),
          "column-2": 5.3,
          "date": data.data +" "+data.hora
        });
      }

      obj['data'].sort( function(obj1, obj2) {
        return parseFloat(obj1.date.split(' ')[1]) - parseFloat(obj2.date.split(' ')[1])
      });

      this.listCharts.push(obj);
    }
  }

  ngOnInit() {}

}
