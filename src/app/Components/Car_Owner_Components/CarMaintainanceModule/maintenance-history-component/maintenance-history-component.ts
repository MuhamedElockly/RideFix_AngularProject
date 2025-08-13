import { Component, inject, OnInit } from '@angular/core';
import { MtypesService } from '../../../../Services/MTypesService/mtypes-service';
import { IMaintenanceType } from '../../../../Interfaces/Mtypes/imaintenance-type';
import { MaintainanceServices } from '../../../../Services/MaintainanceService/maintainance-services';
import { MdetailsInterface } from '../../../../Interfaces/MaintainanceInterfaces/mdetails-interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenance-history-component',
  imports: [CommonModule],
  templateUrl: './maintenance-history-component.html',
  styleUrl: './maintenance-history-component.css',
})
export class MaintenanceHistoryComponent implements OnInit {
  Mtypes: IMaintenanceType[] = [];
  mDetails: MdetailsInterface[] = [];
  mTypesService = inject(MtypesService);
  mServices = inject(MaintainanceServices);
  selectedName: string = 'اختر نوع الصيانة';
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

  onMaintenanceTypeChange(event: any) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    this.selectedName = (event.target as HTMLSelectElement).options[
      (event.target as HTMLSelectElement).selectedIndex
    ].text;
    if (selectedId) {
      this.mServices.GetHistoryByType(selectedId).subscribe({
        next: (res) => {
          this.mDetails = res.data;
        },
        error: (err) => {
          console.error('Error fetching maintenance type:', err);
        },
      });
    } else {
      console.log('No maintenance type selected');
    }
  }
}
