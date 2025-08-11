import { Component, inject, OnInit } from '@angular/core';
import { IMaintenanceType } from '../../../../Interfaces/Mtypes/imaintenance-type';
import { MtypesService } from '../../../../Services/MTypesService/mtypes-service';
import { ICarMaintenanceRecord } from '../../../../Interfaces/MaintainanceInterfaces/icar-maintenance-record';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MaintainanceServices } from '../../../../Services/MaintainanceService/maintainance-services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-mcomponent',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-mcomponent.html',
  styleUrl: './add-mcomponent.css',
})
export class AddMComponent implements OnInit {
  Mtypes: IMaintenanceType[] = [];
  mTypesService = inject(MtypesService);
  newRecord: ICarMaintenanceRecord = {
    maintenanceTypeId: 0,
    performedAt: new Date().toISOString(), // أو سيبها "" لو لسه هيتحدد
    carKMsAtTime: 0,
    maintenanceCenter: '',
    Cost: 0, // سعر الصيانة بالجنيه المصري
    comment: undefined,
  };
  routeService = inject(Router);
  maintainanceService = inject(MaintainanceServices);

  ngOnInit(): void {
    this.mTypesService.GetAll().subscribe({
      next: (res) => {
        this.Mtypes = res.data;
      },
      error: (res) => {
        console.log('Error Occured');
      },
    });
  }
  goBack() {
    window.history.back();
  }

  Submit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control: any) => {
        control.markAsTouched();
      });
      return;
    }
    this.maintainanceService.AddNewMaintainance(this.newRecord).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'تم',
          text: 'تم الاضافة بنجاح',
        });
        this.routeService.navigateByUrl('/CarOwner/MyCar');
      },
      error: (res) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'لقد حدث خطأ',
        });
      },
    });
    // فورم سليم - ابعت الداتا
    console.log(this.newRecord);
  }
}
