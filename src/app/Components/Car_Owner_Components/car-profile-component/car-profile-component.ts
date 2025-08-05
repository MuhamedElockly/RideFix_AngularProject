import { carOwnerGuard } from './../../../Gaurds/car-owner-guard';
import { CarService } from './../../../Services/CarService/car-service';
import { Component, inject, OnInit } from '@angular/core';
import { ICar } from '../../../Interfaces/Car/icar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-profile-component',
  imports: [RouterLink],
  templateUrl: './car-profile-component.html',
  styleUrl: './car-profile-component.css',
})
export class CarProfileComponent implements OnInit {
  car: ICar | null = null;
  carService = inject(CarService);

  ngOnInit(): void {
    this.carService.GetMyCar().subscribe({
      next: (res) => {
        this.car = res.data;
      },
      error: (ex) => {
        this.car = null;
      },
    });
  }
}
