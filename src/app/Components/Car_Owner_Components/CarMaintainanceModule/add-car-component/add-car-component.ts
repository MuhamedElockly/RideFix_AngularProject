import { Component, inject } from '@angular/core';
import { ICarCreating } from '../../../../Interfaces/Car/icar-creating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateCarInterface } from '../../../../Interfaces/Car/create-car-interface';
import { CarService } from '../../../../Services/CarService/car-service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-car-component',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-car-component.html',
  styleUrl: './add-car-component.css',
  standalone: true,
})
export class AddCarComponent {
  routerService = inject(Router);
  carService = inject(CarService);
  // ✅ الكائن الأساسي اللي هنستخدمه في الفورم
  car: CreateCarInterface = {
    vendor: '',
    modelName: '',
    typeOfCar: '',
    typeOfFuel: '',
    modelYear: '',
    avgKmPerMonth: 0,
  };

  // ✅ البيانات الثابتة
  vendors: string[] = [
    'تويوتا',
    'هوندا',
    'نيسان',
    'هيونداي',
    'كيا',
    'مازدا',
    'ميتسوبيشي',
    'سوزوكي',
    'فورد',
    'شيفروليه',
    'بي إم دبليو',
    'مرسيدس',
    'أودي',
    'فولكس فاجن',
    'لكزس',
    'إنفينيتي',
    'أخرى',
  ];

  typesOfCar: string[] = [
    'سيدان',
    'هاتشباك',
    'SUV',
    'كروس أوفر',
    'كوبيه',
    'كونفرتيبل',
    'بيك أب',
    'فان',
    'واجن',
  ];

  fuelTypes: string[] = [
    'بنزين',
    'ديزل',
    'هجين (هايبرد)',
    'كهربائي',
    'غاز طبيعي',
  ];

  modelYears: number[] = [];

  constructor() {
    this.generateModelYears();
  }

  generateModelYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1990; year--) {
      this.modelYears.push(year);
    }
  }

  // ✅ عند الضغط على زر "إضافة السيارة"
  submitForm() {
    console.log('🚗 السيارة:', this.car);
    this.carService.CreateMyCar(this.car).subscribe({
      next: (res) => this.routerService.navigateByUrl('/CarOwner/MyCar'),
      error: (res) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ ما ❌',
        });
      },
    });

    // هنا تبعت البيانات للباك إند أو Service
    // this.carService.addCar(this.car).subscribe(...)
  }

  // ✅ رجوع للخلف
  goBack() {
    window.history.back();
  }
}
