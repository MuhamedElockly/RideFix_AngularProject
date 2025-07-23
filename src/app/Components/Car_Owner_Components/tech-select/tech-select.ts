import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
// import { TechnicianService } from '../../../Services/TechnicianService/technician-service';
import { ITechnician } from '../../../Interfaces/itechnician';
import { TechnicianService } from '../../../Services/TechnicianService/technician-service';

@Component({
  selector: 'app-tech-select',
  imports: [],
  templateUrl: './tech-select.html',
  styleUrl: './tech-select.css',
  encapsulation: ViewEncapsulation.None, // ✨ الحل هنا
})
export class TechSelect {
  techService = inject(TechnicianService);
  filteredTech: ITechnician[] = [];
  SelectedTechs: Number[] = [];
  SelectedCount: number = 0;

  ngOnInit(): void {
    this.filteredTech = this.techService.getFilteredTechs();
  }
  onCheckboxChange(event: Event, selectedId: Number) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.SelectedTechs.push(selectedId);
    } else {
      this.SelectedTechs = this.SelectedTechs.filter((id) => id !== selectedId);
    }
    this.SelectedCount = this.SelectedTechs.length;
  }
}
