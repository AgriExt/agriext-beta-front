import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html'
})
export class GraphicsComponent implements OnInit {
  // @Input() listChats;
  listCharts = [
    {
      title: "temp_inst", data: [

        {
          "column-1": 27.8,
          "date": "01/06/16 11"
        },
        {
          "column-1": 29.6,
          "date": "01/06/16 12"
        }
        ,
        {
          "column-1": 30.4,
          "date": "01/06/16 13"
        },
        {
          "column-1": 31.2,
          "date": "01/06/16 14"
        },
        {
          "column-1": 31.2,
          "date": "01/06/16 15"
        },
        {
          "column-1": 31.2,
          "date": "01/06/16 16"
        },
        {
          "column-1": 30.6,
          "date": "01/06/16 17"
        },
        {
          "column-1": 30.6,
          "date": "01/06/16 18"
        },
        {
          "column-1": 29.8,
          "date": "01/06/16 19"
        }

      ]
    },

    {
      title: "temp_max",
      data: [

        {
          "column-1": 27.8,
          "date": "01/06/16 11"
        },
        {
          "column-1": 29.6,
          "date": "01/06/16 12"
        }
        ,
        {
          "column-1": 30.4,
          "date": "01/06/16 13"
        },
        {
          "column-1": 31.2,
          "date": "01/06/16 14"
        },
        {
          "column-1": 31.2,
          "date": "01/06/16 15"
        },
        {
          "column-1": 31.2,
          "date": "01/06/16 16"
        },
        {
          "column-1": 30.6,
          "date": "01/06/16 17"
        },
        {
          "column-1": 30.6,
          "date": "01/06/16 18"
        },
        {
          "column-1": 29.8,
          "date": "01/06/16 19"
        }

      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
