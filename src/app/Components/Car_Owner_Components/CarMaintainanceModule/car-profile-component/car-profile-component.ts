import { carOwnerGuard } from '../../../../Gaurds/car-owner-guard';
import { CarService } from '../../../../Services/CarService/car-service';
import { Component, inject, OnInit } from '@angular/core';
import { ICar } from '../../../../Interfaces/Car/icar';
import { Router, RouterLink } from '@angular/router';
import { MSummaryComponent } from '../msummary-component/msummary-component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-profile-component',
  imports: [RouterLink, MSummaryComponent],
  templateUrl: './car-profile-component.html',
  styleUrl: './car-profile-component.css',
})
export class CarProfileComponent implements OnInit {
  car: ICar | null = null;
  carService = inject(CarService);
  router = inject(Router);
  ngOnInit(): void {
    this.carService.GetMyCar().subscribe({
      next: (res) => {
        this.car = res.data;
        console.log('Car data:', this.car.daysSinceLastMaintenance);
      },
      error: (ex) => {
        this.car = null;
      },
    });
  }
  removeCar() {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'سيتم حذف السيارة نهائياً!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، إحذفها',
      cancelButtonText: 'إلغاء',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call API to remove car
        this.carService.DeleteCar().subscribe({
          next: (res) => {
            Swal.fire('تم الحذف!', 'تم إزالة السيارة بنجاح.', 'success');
            window.location.reload();
          },
          error: (res) => {
            Swal.fire('لقد حدثت مشكلة', 'error');
          },
        });
      }
    });
  }
}
