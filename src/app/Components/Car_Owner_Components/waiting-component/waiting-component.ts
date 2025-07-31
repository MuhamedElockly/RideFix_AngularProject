import { Component, inject, ViewEncapsulation } from '@angular/core';
import { NavBarComponent } from '../../nav-bar-component/nav-bar-component';
import { FooterComponent } from '../../footer-component/footer-component';
import { RequestService } from '../../../Services/RequestService/request-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-waiting-component',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './waiting-component.html',
  styleUrl: './waiting-component.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class WaitingComponent {
  requestService = inject(RequestService);
  routeService = inject(Router);
  cancelRequest() {
    this.requestService.CancelRequest(1).subscribe({
      next: (res) => {
        window.location.reload();
        this.routeService.navigateByUrl('/CarOwner/SelectTech');
      },
      error: (res) => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'لقد حدث خطأ',
        });
      },
    });
  }
}
