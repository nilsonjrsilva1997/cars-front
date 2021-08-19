import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  urlApi = 'http://localhost:8182';

  constructor(private httpClient:HttpClient) {
    
  }

  save(data:any):Observable<any> {
    return this.httpClient.post(this.urlApi + '/veiculos', data);
  }

  list() {
    return this.httpClient.get(this.urlApi + '/veiculos');
  }

  show(id:any):Observable<any> {
    return this.httpClient.get(this.urlApi + '/veiculos/' + id);
  }

  update(body:any, id:any) {
    return this.httpClient.put(this.urlApi + '/veiculos/' + id, body);
  }

  delete(id:any) {
    return this.httpClient.delete(this.urlApi + '/veiculos/' + id);
  }
}
