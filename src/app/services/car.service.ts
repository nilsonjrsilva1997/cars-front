import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  urlApi = 'http://localhost:8080';

  constructor(private httpClient:HttpClient) {
    
  }

  save(data:any):Observable<any> {
    return this.httpClient.post(this.urlApi + '/veiculos', data);
  }
}
