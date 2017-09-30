import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';

@Component({
  selector: 'app-generate-model',
  templateUrl: './generate-model.component.html'
})
export class GenerateModelComponent implements OnInit {

  constructor(private restService: RestService) { }

  modelo = null;
  avaliacao = null;

  ngOnInit() {
  }

  gerar(type) {
    this.restService.gerarModelo(sessionStorage.getItem('csv-name').replace('.csv', ''), sessionStorage.getItem('csv-body'), type).subscribe((data) => {
      let dataSplit = data.split('smashline');
      this.avaliacao = dataSplit[0];
      this.modelo = dataSplit[1];

    });
  }

  getURL() {
    return "http://localhost:8080/data/download/" + sessionStorage.getItem('csv-name').replace('.csv','')+".model";
  }

}
