import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RestService {

  DataSet: any[] = [];

  private url = 'http://localhost:8080/data/';

  private paths = {
    uploadFile: 'uploadFile/',
    uploadModel: 'uploadModel/'
  };

  constructor(private http: Http) { }

  makeCsv(csv_body) {
    let csv = csv_body.split(/\n/);
    let head = csv[0].split(',');
    let indexData = head.indexOf('data'),
      indexHora = head.indexOf('hora'),
      indexRecord = head.indexOf('record'),
      indexCodEst = head.indexOf('codigo_estacao');

    let newCsvBody = [];
    for (let row of csv) {
      let splitRow = row.split(',');

      let newRow = splitRow.filter(function (value) {
        if (value != splitRow[indexData] && value != splitRow[indexHora]) {
          if (indexRecord != -1 && value != splitRow[indexRecord]) {
            return true;
          }
          if (indexCodEst != -1 && value != splitRow[indexCodEst]) {
            return true;
          }
        }
        return false;
      });
      newCsvBody.push(newRow.join(","));
    }
    return newCsvBody.join("\n");
  }

  gerarModelo(csv_name, csv_body, type) {
    console.log(this.makeCsv(csv_body));
    let file = new File([this.makeCsv(csv_body)], csv_name, { type: 'text/csv' });
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.url + this.paths.uploadFile + type, formData)
      .map((response: Response) => {
        return response.text();
      })
      .catch((error: Response) => Observable.throw(error));
  }

  gerarEt(csv_name, csv_body, kc) {
    let file = new File([this.makeCsv(csv_body)], csv_name, { type: 'text/csv' });
    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('kc', kc);

    return this.http.post(this.url + this.paths.uploadFile, formData)
      .map((response: Response) => {
        return response.text();
      })
      .catch((error: Response) => Observable.throw(error));
  }

  gerarEtModel(csv_name, csv_body, model, kc) {
    let file = new File([this.makeCsv(csv_body)], csv_name, { type: 'text/csv' });
    let fileModel = new File([model], 'teste' + '.model', { type: 'application/octet-stream' });

    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('model', fileModel, fileModel.name);
    formData.append('kc', kc);

    return this.http.post(this.url + this.paths.uploadModel, formData)
      .map((response: Response) => {
        return response.text();
      })
      .catch((error: Response) => Observable.throw(error));
  }
}
