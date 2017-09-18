import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RestService {

  DataSet: any[] = [];

  private url = 'http://172.18.102.253:8181/data/';
  private paths = {
    uploadFile: '/uploadFile'
  };

  constructor(private http: Http) { }

  // getDataSet(name):void {
  //   this.http.get(`${RestStationService.baseURL}/name`)
  //   .map((response:Response) => {
  //     return this.DataSet = response.json();
  //   })
  //   .catch((error : Response) => Observable.throw(error));
  // }

  gerarModelo(csv_name, csv_body, type) {
    let file = new File([csv_body], csv_name, { type: 'text/csv' });
    let formData = new FormData();
    formData.append('file', file, file.name);

    // let headers = new Headers();
    // headers.append('Enctype', 'multipart/form-data');
    // headers.append('Accept', 'multipart/form-data');
    // headers.append('Content-Type' , 'multipart/form-data');
    // headers.append('Access-Control-Allow-Headers', '*');
    // headers.append('Access-Control-Allow-Methods', '*');
    // headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post(this.url + type, formData)
      .map((response: Response) => {
        return response.text();
      })
      .catch((error: Response) => Observable.throw(error));
  }

}
