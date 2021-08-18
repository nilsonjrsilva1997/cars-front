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

  form = new FormGroup({
    brand: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    sold: new FormControl('', Validators.required),
    vehicle: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
  });

  constructor(
    private carService:CarService,
    private toastrService:ToastrService
    ) {
    
  }

  ngOnInit(): void {
  }

  save(event:any) {
    event.preventDefault();

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
      console.log(err);
      for (let i = 0; i < err.error.length; i++) {
        const element = err.error[i];

        this.toastrService.error(element, 'Erro', {
          timeOut: 4000,
        });
      }
    })
  }

}
