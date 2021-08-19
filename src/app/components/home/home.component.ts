import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FipeService } from 'src/app/services/fipe.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService:HomeService, private fipe:FipeService, private toastr:ToastrService) { }

  public notSold:number = 0;

  ngOnInit(): void {

    this.countNotSold();

  }

  countNotSold() {
    this.homeService.countNotSold().subscribe(res => {
      this.notSold = res;
    }, err => {
      this.toastr.error('Erro ao buscar carros nao vendidos');
    });
  }

  carsByBrand(brand:string) {
    this.homeService.carsByBrand(brand).subscribe(res => {

    }, err => {
      this.toastr.error('Erro ao buscar carros por marca');
    });
  }

  carsByDec(year:any) {
    this.homeService.carsByDec(year).subscribe(res => {

    }, err => {
      this.toastr.error('Erro ao buscar carros por decada');
    });
  }
}
