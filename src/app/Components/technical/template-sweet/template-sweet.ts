import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
    declare var bootstrap: any;
// import 'bootstrap/dist/js/bootstrap.bundle';
@Component({
  selector: 'app-template-sweet',
  imports: [CommonModule],
  templateUrl: './template-sweet.html',
  styleUrl: './template-sweet.css'
})
export class TemplateSweet {

  @Input() message: string = 'Congratulations';
  @Input() visible: boolean = false;









}
