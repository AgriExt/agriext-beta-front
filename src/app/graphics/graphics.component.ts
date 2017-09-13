import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html'
})
export class GraphicsComponent implements OnInit {
  @Input() datas;
  listCharts;

  constructor() {}

  ngOnInit() {
        
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
          "date": data.data +" "+data.hora
        });
      }

      obj['data'].sort( function(obj1, obj2) {
        return parseFloat(obj1.date.split(' ')[1]) - parseFloat(obj2.date.split(' ')[1])
      });

      this.listCharts.push(obj);
    }

  }

  // listCharts = [
  //   {
  //     title: "temp_inst", data: [

  //       {
  //         "column-1": 27.8,
  //         "date": "11"
  //       },
  //       {
  //         "column-1": 29.6,
  //         "date": "12"
  //       }
  //       ,
  //       {
  //         "column-1": 30.4,
  //         "date": "13"
  //       },
  //       {
  //         "column-1": 31.2,
  //         "date": "14"
  //       },
  //       {
  //         "column-1": 31.2,
  //         "date": "15"
  //       },
  //       {
  //         "column-1": 31.2,
  //         "date": "16"
  //       },
  //       {
  //         "column-1": 30.6,
  //         "date": "17"
  //       },
  //       {
  //         "column-1": 30.6,
  //         "date": "18"
  //       },
  //       {
  //         "column-1": 29.8,
  //         "date": "19"
  //       }

  //     ]
  //   },

  //   {
  //     title: "temp_inst2", data: [

  //       {
  //         "column-1": 27.8,
  //         "date": "11"
  //       },
  //       {
  //         "column-1": 29.6,
  //         "date": "12"
  //       }
  //       ,
  //       {
  //         "column-1": 30.4,
  //         "date": "13"
  //       },
  //       {
  //         "column-1": 31.2,
  //         "date": "14"
  //       },
  //       {
  //         "column-1": 31.2,
  //         "date": "15"
  //       },
  //       {
  //         "column-1": 31.2,
  //         "date": "16"
  //       },
  //       {
  //         "column-1": 30.6,
  //         "date": "17"
  //       },
  //       {
  //         "column-1": 30.6,
  //         "date": "18"
  //       },
  //       {
  //         "column-1": 29.8,
  //         "date": "19"
  //       }

  //     ]
  //   }
  // ]


}
