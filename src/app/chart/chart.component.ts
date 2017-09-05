import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
  @Input() dataChart: any;
  private chart: AmChart;

  constructor(private AmCharts: AmChartsService) { }

  ngAfterViewInit() {
    this.chart = this.AmCharts.makeChart(this.dataChart.title, {
      "type": "serial",
      "categoryField": "date",
      "dataDateFormat": "HH",
      // "dataDateFormat": "YYYY-MM-DD HH",
      "theme": "light",
      "categoryAxis": {
        "minPeriod": "hh",
        "parseDates": true
      },
      "chartCursor": {
        "enabled": true,
        "categoryBalloonDateFormat": "JJ:NN"
      },
      "chartScrollbar": {
        "enabled": true
      },
      "trendLines": [],
      "graphs": [
        {
          "bullet": "round",
          "id": "AmGraph-1",
          "title": "Valores obtidos",
          "valueField": "column-1"
        }
      ],
      "guides": [],
      "valueAxes": [
        {
          "id": "ValueAxis-1",
          "title": "Valores em (ºC)"
        }
      ],
      "allLabels": [],
      "balloon": {},
      "legend": {
        "enabled": true,
        "useGraphSettings": true
      },
      "titles": [
        {
          "id": "Title-1",
          "size": 15,
          "text": this.dataChart.title
        }
      ],
      "dataProvider": this.dataChart.data
    });
  }

  ngOnInit() {
    // this.chart = this.AmCharts.makeChart(this.dataChart.title, {
    //   "type": "serial",
    //   "categoryField": "date",
    //   "dataDateFormat": "DD/MM/YY HH",
    //   // "dataDateFormat": "YYYY-MM-DD HH",
    //   "theme": "light",
    //   "categoryAxis": {
    //     "minPeriod": "hh",
    //     "parseDates": true
    //   },
    //   "chartCursor": {
    //     "enabled": true,
    //     "categoryBalloonDateFormat": "JJ:NN"
    //   },
    //   "chartScrollbar": {
    //     "enabled": true
    //   },
    //   "trendLines": [],
    //   "graphs": [
    //     {
    //       "bullet": "round",
    //       "id": "AmGraph-1",
    //       "title": "Valores obtidos",
    //       "valueField": "column-1"
    //     }
    //   ],
    //   "guides": [],
    //   "valueAxes": [
    //     {
    //       "id": "ValueAxis-1",
    //       "title": "Valores em (ºC)"
    //     }
    //   ],
    //   "allLabels": [],
    //   "balloon": {},
    //   "legend": {
    //     "enabled": true,
    //     "useGraphSettings": true
    //   },
    //   "titles": [
    //     {
    //       "id": "Title-1",
    //       "size": 15,
    //       "text": this.dataChart.title
    //     }
    //   ],
    //   "dataProvider": this.dataChart.data
    // });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }

}
