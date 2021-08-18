import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FipeService {

  constructor(private httpClient:HttpClient) { }

  list():Observable<any> {
    return this.httpClient.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
  }
}
