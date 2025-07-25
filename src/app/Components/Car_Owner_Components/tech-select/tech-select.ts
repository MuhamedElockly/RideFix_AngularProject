import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
// import { TechnicianService } from '../../../Services/TechnicianService/technician-service';
import { ITechnician } from '../../../Interfaces/itechnician';
import { TechnicianService } from '../../../Services/TechnicianService/technician-service';
import { RequestService } from '../../../Services/RequestService/request-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tech-select',
  imports: [],
  templateUrl: './tech-select.html',
  styleUrl: './tech-select.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class TechSelect implements OnInit {
  routeService = inject(Router);
  techService = inject(TechnicianService);
  requestService = inject(RequestService);

  filteredTech: ITechnician[] = [];
  SelectedTechs: number[] = [];
  SelectedCount: number = 0;

  ngOnInit(): void {
    this.filteredTech = this.techService.getFilteredTechs();
  }
  onCheckboxChange(event: Event, selectedId: number) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.SelectedTechs.push(Number(selectedId));
    } else {
      this.SelectedTechs = this.SelectedTechs.filter((id) => id !== selectedId);
    }
    this.SelectedCount = this.SelectedTechs.length;
  }

  submitSelection() {
    this.requestService.CreateRequest(this.SelectedTechs).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'تم بنجاح',
          text: 'تم إرسال الطلب بنجاح',
          confirmButtonText: 'حسناً',
        }).then(() => {
          this.routeService.navigateByUrl('CarOwner/Waiting');
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى',
          confirmButtonText: 'حسناً',
        });
      },
    });
  }
}
