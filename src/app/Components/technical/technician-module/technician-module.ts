import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-technician-module',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './technician-module.html',
  styleUrl: './technician-module.css'
})
export class TechnicianModule {

}
