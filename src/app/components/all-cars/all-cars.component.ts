import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {

  data:any;
  public paginaAtual = 1;

  constructor(
    private carService:CarService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.carService.list().subscribe(res => {
      this.data = res;
    }, err => {
      this.toastr.error('Erro ao buscar dados');
    })
  }

}
