import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RestService {

  DataSet: any[] = [];

  private url = 'http://200.129.38.177:8080/data/';
  private paths = {
    uploadFile: 'uploadFile/',
    downloadModel: 'download/'
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

    return this.http.post(this.url + this.paths.uploadFile , formData)
    .map((response: Response) => {
      return response.text();
    })
    .catch((error: Response) => Observable.throw(error));
  }
}
