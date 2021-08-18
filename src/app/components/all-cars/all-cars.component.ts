import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { FipeService } from 'src/app/services/fipe.service';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {

  data: any;
  public paginaAtual = 1;
  public modalRef: any;
  public soldForm: any;
  public brands: any = [];
  public brandForm: any;
  public carId: any;
  public rdbTrue: string = '';
  public rdbFalse: string = '';

  form = new FormGroup({
    brand: new FormControl(''),
    description: new FormControl('', Validators.required),
    sold: new FormControl(null),
    vehicle: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
  });

  constructor(
    private carService: CarService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private fipeService: FipeService
  ) {

  }

  listCars() {
    this.carService.list().subscribe(res => {
      this.data = res;
    }, err => {
      this.toastr.error('Erro ao buscar dados');
    })
  }

  ngOnInit(): void {
    this.listCars();
  }

  public openModal(template: TemplateRef<any>, carId: any) {
    this.carId = carId;
    this.carService.show(this.carId).subscribe(res => {
      this.form = new FormGroup({
        description: new FormControl(res.description, Validators.required),
        vehicle: new FormControl(res.vehicle, Validators.required),
        year: new FormControl(res.year, Validators.required),
        brand: new FormControl(res.brand),
        sold: new FormControl(res.sold),
      });

      this.initSelect(res.brand);

      this.initRadio(res.sold);

      this.soldForm = res.sold;
    }, err => {
      this.toastr.error('Erro ao buscar carro', 'Erro');
    })
    this.modalRef = this.modalService.show(template);
  }

  initRadio(sold: any) {
    console.log(sold);

    if (sold == true) {
      this.rdbTrue = 'checked';
      this.rdbFalse = '';
    }

    if (sold == false) {
      this.rdbTrue = '';
      this.rdbFalse = 'checked';
    }

    console.log(this.rdbTrue);
    console.log(this.rdbFalse);
  }

  initSelect(brand: string) {
    this.fipeService.list().subscribe(res => {
      for (let item of res) {
        if (brand == item.nome) {
          this.brandForm = item.nome;
          item.selected = 'selected';
          this.brands.push(item);
        } else {
          item.selected = '';
          this.brands.push(item);
        }
      }
    }, err => {
      this.toastr.error('Erro ao buscar marcas', 'Erro');
    });
  }

  update(event: any) {
    this.form.value.sold = this.soldForm;
    this.form.value.brand = this.brandForm;

    this.carService.update(this.form.value, this.carId).subscribe(res => {
      this.toastr.success('Dados alterados com sucesso', 'Sucess');
      this.listCars();
    }, err => {
      console.log(err);
      this.toastr.error('Erro ao atualizar dados', 'Erro');
    });
  }

  delete() {
    this.carService.delete(this.carId).subscribe(res => {
      this.toastr.success('Carro deletado com sucesso');
      this.listCars();
    }, err => {
      this.toastr.error('Erro ao deletar carro');
    })
  }

  radio(event: any) {
    if (event.path[0].attributes.value.value == "true") {
      this.soldForm = true;
    }

    if (event.path[0].attributes.value.value == "false") {
      this.soldForm = false;
    }

    console.log(this.soldForm);
  }

  listBrands(event: any) {
    this.brandForm = event.path[0].value;
  }
}
