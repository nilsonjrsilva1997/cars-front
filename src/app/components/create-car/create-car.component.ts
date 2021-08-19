import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { FipeService } from 'src/app/services/fipe.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

  public soldForm:any;
  public brands:any;
  public brandForm:any;

  form = new FormGroup({
    brand: new FormControl(''),
    description: new FormControl('', Validators.required),
    sold: new FormControl(null),
    vehicle: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
  });

  constructor(
    private carService:CarService,
    private toastrService:ToastrService,
    private fipeService:FipeService
    ) {
      this.soldForm = null;
      this.brandForm = null;
  }

  ngOnInit(): void {
    this.fipeService.list().subscribe(res => {
      this.brands = res;
    }, err => {
      this.toastrService.error('Erro ao buscar marca de carros');
    });
  }

  save(event:any) {
    event.preventDefault();

    if(this.soldForm == null) {
      this.toastrService.warning('Marque se o carro foi vendido ou não');
      return;
    }

    if(this.brandForm == null && this.brandForm == "null") {
      this.toastrService.warning('Selecione a marca do veículo');
      return;
    }

    this.form.value.sold = this.soldForm;
    this.form.value.brand = this.brandForm;

    this.carService.save(this.form.value).subscribe(res => {
      this.toastrService.success('Veículo salvo com sucesso');
      
      this.form = new FormGroup({
        brand: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        sold: new FormControl('', Validators.required),
        vehicle: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
      });
      
    }, err => {
      for (let i = 0; i < err.error.length; i++) {
        const element = err.error[i];

        this.toastrService.error(element, 'Erro', {
          timeOut: 4000,
        });
      }
    })
  }

  radio(event:any) {

    if(event.path[0].attributes.value.value == "true") {
      this.soldForm = true;
    } 

    if(event.path[0].attributes.value.value == "false") {
      this.soldForm = false;
    } 
  }

  listBrands(event:any) {
    this.brandForm = event.path[0].value;
  }

}
