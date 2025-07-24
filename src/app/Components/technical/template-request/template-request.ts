import { Component, Input } from '@angular/core';
import { ItechRequect } from '../../../Interfaces/itech-requect';

@Component({
  selector: 'app-template-request',
  imports: [],
  templateUrl: './template-request.html',
  styleUrl: './template-request.css'
})
export class TemplateRequest {

@Input() request!:ItechRequect[];
@Input() showBookingButton: boolean = false;
}
