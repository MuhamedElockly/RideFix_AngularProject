import { Component } from '@angular/core';
import { ICar } from '../../../Interfaces/Car/icar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-profile-component',
  imports: [RouterLink],
  templateUrl: './car-profile-component.html',
  styleUrl: './car-profile-component.css',
})
export class CarProfileComponent {
  car: ICar | null = null;
}
