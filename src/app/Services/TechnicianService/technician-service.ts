import { IPreRequest } from './../../Interfaces/ipre-request';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITechnician } from '../../Interfaces/itechnician';
@Injectable({
  providedIn: 'root',
})
export class TechnicianService {
  FilteredTechs: ITechnician[];
  /**
   *
   */
  constructor() {
    this.FilteredTechs = [];
  }

  public setFilteredTechs(data: any) {
    this.FilteredTechs = data;
  }

  public getFilteredTechs(): ITechnician[] {
    return this.FilteredTechs;
  }
}
