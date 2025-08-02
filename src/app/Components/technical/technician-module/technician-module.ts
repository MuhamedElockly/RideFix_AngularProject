import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { TechnicianNavBar } from '../technician-nav-bar/technician-nav-bar';

@Component({
  selector: 'app-technician-module',
  imports: [RouterOutlet, Sidebar, TechnicianNavBar],
  templateUrl: './technician-module.html',
  styleUrl: './technician-module.css'
})
export class TechnicianModule {

}
