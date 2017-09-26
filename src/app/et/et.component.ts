import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-et',
  templateUrl: './et.component.html',
  styleUrls: ['./et.component.css']
})
export class EtComponent implements OnInit {

  optionModel = null;
  kc = null;
  evapotranspirada = null;
  irrigacao = null;
  listET_kcEt = null;

  constructor(private restService: RestService) { }

  ngOnInit() {
  }

  findOptionModel(value) {
    this.optionModel = value;
  }

  run() {
    if (this.kc != null && this.optionModel != null) {
      this.restService.gerarEt(sessionStorage.getItem('csv-name'), sessionStorage.getItem('csv-body'), this.kc)
        .subscribe( (data)  => {
          let array = data.split(/\n/);
          this.listET_kcEt = array.slice(0, array.length-1);
          console.log(this.listET_kcEt);
          this.evapotranspirada = array[array.length-1].split(',')[0];
          this.irrigacao = array[array.length-1].split(',')[1];
        });
    } else {
      alert('É necessario o kc e o algoritmo!!!');
    }
  }
}
