import { IPreRequest } from './../../../Interfaces/ipre-request';
import { Router } from '@angular/router';

import {
  Component,
  inject,
  NgModule,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ICategory } from '../../../Interfaces/icategory';
import { NgClass, NumberSymbol } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { GetLocation } from '../../../Services/LocationService/get-location';
import { RequestService } from '../../../Services/RequestService/request-service';
import { TechnicianService } from '../../../Services/TechnicianService/technician-service';

@Component({
  selector: 'app-request-emergency-component',
  imports: [NgClass, FormsModule, FormsModule],
  templateUrl: './request-emergency-component.html',
  styleUrl: './request-emergency-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class RequestEmergencyComponent implements OnInit {
  selectedCategory: string;
  categories: ICategory[];
  PreRequest: IPreRequest;
  Description: string = '';
  Imgs: string[] = [];

  routeService = inject(Router);
  requestService = inject(RequestService);
  techService = inject(TechnicianService);

  //#region Location Service
  locationService = inject(GetLocation);
  longitude: Number | null;
  latitude: Number | null;
  //#endregion

  constructor() {
    this.selectedCategory = '';
    this.longitude = 0;
    this.latitude = 0;
    this.categories = [
      { CategoryId: 1, Name: 'عفشجي' },
      { CategoryId: 2, Name: 'كهرباء سيارات' },
      { CategoryId: 3, Name: 'ميكانيكي' },
    ];
    this.PreRequest = {
      carOwnerId: 1,
      categoryId: 0,
      latitude: 30,
      longitude: 33,
      pin: 0,
    };
  }

  async ngOnInit(): Promise<void> {
    try {
      const location = await this.locationService.getLocation();
      if (location != null) {
        this.longitude = location.longitude;
        this.latitude = location.latitude;

        // 👇 ضيفهم مباشرة بعد ما يوصلوا
        this.PreRequest.longitude = location.longitude;
        this.PreRequest.latitude = location.latitude;
      } else {
        this.PreRequest.longitude = null;
        this.PreRequest.latitude = null;
      }
    } catch (error) {
      console.error('Failed to get location:', error);
      this.PreRequest.longitude = null;
      this.PreRequest.latitude = null;
    }
  }

  onChange() {
    console.log(this.selectedCategory);
    this.PreRequest.categoryId = Number(this.selectedCategory);
  }

  onSubmit() {
    Swal.fire({
      title: 'أدخل رمز PIN',
      input: 'text',
      inputLabel: 'الرمز السري المكوّن من 4 أرقام',
      inputPlaceholder: '••••',
      inputAttributes: {
        maxlength: '4',
        pattern: '[0-9]*',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'تأكيد',
      cancelButtonText: 'إلغاء',
      inputValidator: (value) => {
        if (!value) {
          return 'من فضلك أدخل رمز PIN';
        } else if (!/^\d{2}$/.test(value)) {
          return 'الرمز يجب أن يكون 4 أرقام فقط';
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.PreRequest.pin = result.value;
        this.requestService.CreatePreRequest(this.PreRequest).subscribe({
          next: (res) => {
            if (res.status == 200) {
              this.requestService.SetRealRequestData(
                this.PreRequest,
                this.Description,
                this.Imgs
              );
              this.techService.setFilteredTechs(res.body?.data);
              this.routeService.navigateByUrl('/CarOwner/SelectTech');
            } else if (res.status == 400) {
            }
          },
          error: (err) => {
            if (err.status == 400) {
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'رمز PIN غير صحيح ❌',
              });
            } else if ((err.status = 404)) {
              Swal.fire({
                icon: 'error',
                title: 'للاسف',
                text: 'لا يوجد فني يخدم في هذه المنطقة الان',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'حدث خطأ',
                text: 'لم يتم التحقق من الرمز. حاول مرة أخرى لاحقًا.',
              });
            }
          },
        });
      }
    });
  }
}
