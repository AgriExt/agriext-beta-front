import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class RestService {

  DataSet: any[] = [];

  private baseURL = 'http://200.129.38.174:8181/data';
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

    return this.http.post('http://200.129.38.174:8181/data/uploadFile/' + type, formData)
      .map((response: Response) => {
        // console.log(response.text());
        return response.text();
      })
      .catch((error: Response) => Observable.throw(error));
  }

}
