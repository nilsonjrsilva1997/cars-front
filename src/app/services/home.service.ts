import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  urlApi = 'http://localhost:8080/veiculos/';

  constructor(private httpClient:HttpClient) { }

  countNotSold():Observable<any> {
    return this.httpClient.get(this.urlApi + 'nao-vendido');
  }

  carsByBrand(brand:string):Observable<any> {
    return this.httpClient.get(this.urlApi + 'por-marca/' + brand);
  }

  carsByDec(year:any):Observable<any> {
    return this.httpClient.get(this.urlApi + 'por-decada/' + year);
  }
}
