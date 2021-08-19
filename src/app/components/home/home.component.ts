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
  public carsByBrandForm: any = [];

  ngOnInit(): void {

    this.countNotSold();
    this.carsByBrand();

  }

  countNotSold() {
    this.homeService.countNotSold().subscribe(res => {
      this.notSold = res;
    }, err => {
      this.toastr.error('Erro ao buscar carros nao vendidos');
    });
  }

  carsByBrand() {

    this.fipe.list().subscribe(res => {

      Object.keys(res).forEach((key) => {
        let brand = res[key].nome;

        this.homeService.carsByBrand(brand).subscribe(res => {
          this.carsByBrandForm.push({
              brand: brand, num: res
            });
        }, err => {
          this.toastr.error('Erro ao buscar carros por marca');
        });
      });

    }, err => {
      this.toastr.error('Erro ao buscar carros por marca');
    });

    console.log(this.carsByBrandForm);
  }

  carsByDec(year:any) {
    this.homeService.carsByDec(year).subscribe(res => {

    }, err => {
      this.toastr.error('Erro ao buscar carros por decada');
    });
  }
}
