import { UploadFile } from './../../util/UploadFile';
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
  fileModel = null;

  private uploadFile: UploadFile;

  modelos = {
    JENSEN_HAYSE: 1,
    HC: 0
  }

  constructor(private restService: RestService) {
    this.uploadFile = new UploadFile();
  }

  ngOnInit() {
  }

  findOptionModel(value) {
    this.optionModel = value;
  }

  upload(fileInput) {
    let self = this;
    self.uploadFile.read(fileInput.files[0], [
      {
        event: "loadend",
        callback: function () {
          self.fileModel = this.result;
          console.log(this.result);
          // self.restService.gerarEtModel(sessionStorage.getItem('csv-name'), sessionStorage.getItem('csv-body'), this.result, self.kc)
          //   .subscribe(function (data) {
          //     console.log(data);
        }
      }
    ]);
  }

  private generateListEt0(mapDates, kc) {

    let listEt0 = [];

    for (let key in mapDates) {
      let rad = mapDates[key][1] / 2450;
      let et0 = rad * (0.025 * mapDates[key][0] + 0.078);

      let et0_EtKc = [];

      et0_EtKc.push(et0);
      et0_EtKc.push(et0 * kc);

      listEt0.push(et0_EtKc.join(','));
    }

    return listEt0.slice(0, listEt0.length - 1);
  }


  private datesDay() {
    /**
   * Dados do CSV
   */
    let array = sessionStorage.getItem('csv-body').split(/\n/);
    let datas = array.slice(1, array.length);

    /**
     * Mapa de dados com datas unicas.
     */
    let mapDates = {};

    /**
     * Indices dos dados utilizados no modelo jj.
     */
    let indexDate = array[0].split(',').indexOf('data');
    let indexRad = array[0].split(',').indexOf('radiacao');
    let indexTempMax = array[0].split(',').indexOf('temp_max');
    let indexTempMin = array[0].split(',').indexOf('temp_min');

    if (indexRad == -1) {
      indexRad = array[0].split(',').indexOf('rad_solar_media');
    }

    if (indexTempMax == -1) {
      indexTempMax = array[0].split(',').indexOf('temp_ar_max');
    }

    if (indexTempMin == -1) {
      indexTempMin = array[0].split(',').indexOf('temp_ar_min');
    }

    /**
     * Adicionando datas no mapa.
     */
    for (let row of datas) {
      if (!mapDates[row.split(',')[indexDate]]) {
        mapDates[row.split(',')[indexDate]] = [];
      }
    }

    Object.keys(mapDates).forEach(function (date) {
      let medTemMax = 0,
        medTemMin = 0,
        medRad = 0,
        cont = 0;

      for (let row of datas) {
        let splitRow = row.split(',');
        if (splitRow[indexDate] == date) {
          medTemMax += parseFloat(splitRow[indexTempMax]);
          medTemMin += parseFloat(splitRow[indexTempMin]);
          medRad += parseFloat(splitRow[indexRad]);
          cont += 1;
        }
      }

      let medTemAr = ((medTemMax / cont) + (medTemMin / cont)) / 2;
      mapDates[date].push(medTemAr);
      mapDates[date].push((medRad / cont));
    });

    return mapDates;
  }

  run() {
    if (this.fileModel != null && this.kc != null) {
      this.restService.gerarEtModel(sessionStorage.getItem('csv-name'), sessionStorage.getItem('csv-body'), this.fileModel, this.kc)
        .subscribe(function (data) {
          console.log(data);
        })
    }
    else if (this.kc != null && this.optionModel != null) {
      if (this.optionModel == this.modelos.JENSEN_HAYSE) {
        let mapDate = this.datesDay();
        this.listET_kcEt = this.generateListEt0(mapDate, this.kc);
        this.evapotranspirada = 0;
        for (let row of this.listET_kcEt) {
          let splitRow = row.split(',');
          this.evapotranspirada += parseFloat(splitRow[0]);
        }

        this.irrigacao = this.evapotranspirada * this.kc;

      } else {
        this.restService.gerarEt(sessionStorage.getItem('csv-name'), sessionStorage.getItem('csv-body'), this.kc)
          .subscribe((data) => {
            let array = data.split(/\n/);
            this.listET_kcEt = array.slice(0, array.length - 1);
            console.log(this.listET_kcEt);
            this.evapotranspirada = array[array.length - 1].split(',')[0];
            this.irrigacao = array[array.length - 1].split(',')[1];
          });
      }

    } else {
      alert('É necessario o kc e o algoritmo!!!');
    }
  }
}
