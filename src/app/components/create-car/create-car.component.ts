import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

  public soldForm:any;

  form = new FormGroup({
    brand: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    sold: new FormControl(null),
    vehicle: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
  });

  constructor(
    private carService:CarService,
    private toastrService:ToastrService
    ) {
      this.soldForm = null;
  }

  ngOnInit(): void {
  }

  save(event:any) {
    event.preventDefault();

    if(this.soldForm == null) {
      this.toastrService.warning('Marque se o carro foi vendido ou não');
      return;
    }

    this.form.value.sold = this.soldForm;

    this.carService.save(this.form.value).subscribe(res => {
      this.toastrService.success('Veículo salvo com sucesso');
      
      this.form = new FormGroup({
        brand: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        sold: new FormControl('', Validators.required),
        vehicle: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
      });

      this.form.addControl('sold', new FormControl(this.soldForm));

      
    }, err => {
      console.log(err);
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

}
