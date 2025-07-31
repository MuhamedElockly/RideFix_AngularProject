import { Component, OnInit } from '@angular/core';
// import { TechServieces } from '../tech-servieces/tech-servieces';
import { Technincalservice } from '../../../Services/Technincalservice/technincalservice';
import { Itechiciandetails } from '../../../Interfaces/itechiciandetails';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profiletech',
  imports: [CommonModule],
  templateUrl: './profiletech.html',
  styleUrl: './profiletech.css'
})
export class Profiletech implements OnInit {
constructor(private techServieces:Technincalservice){}
 tech:Itechiciandetails|null=null;

  ngOnInit(): void {
      this.techServieces.gettechnician().subscribe({
        next:b=>{

          this.tech=b;
          console.log('Technician details:', this.tech);
        }
      })
  }
}
