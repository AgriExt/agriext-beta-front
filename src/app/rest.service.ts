import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RestService {

  DataSet: any[] = [];

  private url = 'http://localhost:8080/data/';

  private paths = {
    uploadFile: 'uploadFile/',
    downloadModel: 'download/',
    uploadModel: 'uploadModel/'
  };

  constructor(private http: Http) { }

  gerarModelo(csv_name, csv_body, type) {
    let file = new File([csv_body], csv_name, { type: 'text/csv' });
    let formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.url + this.paths.uploadFile + type, formData)
      .map((response: Response) => {
        return response.text();
      })
      .catch((error: Response) => Observable.throw(error));
  }

  gerarEt(csv_name, csv_body, kc) {
    let file = new File([csv_body], csv_name, { type: 'text/csv' });
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
    let file = new File([csv_body], csv_name, { type: 'text/csv' });
    let fileModel = new File([model], 'model',  { type: 'text/model' });
    // console.log(fileModel);
    // console.log(model instanceof File);

    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('model', fileModel, fileModel.name);
    formData.append('kc', kc);

    // console.log(formData);

    return this.http.post(this.url + this.paths.uploadModel, formData)
      .map((response: Response) => {
        return response.text();
      })
      .catch((error: Response) => Observable.throw(error));
  }
}
