import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ItechRequect } from '../../Interfaces/itech-requect';
import { map } from 'rxjs';
import { IcheckRequect } from '../../Interfaces/icheck-requect';
import { IApiResponse } from '../../Interfaces/iapi-response';

@Injectable({
  providedIn: 'root'
})
export class TechrequestService {
  constructor(private http:HttpClient){}

  private technid=localStorage.getItem('token');
  // private name=localStorage.getItem('token');

   getAll(){
    return this.http.get<any>(`http://localhost:5038/api/TRequestEmergency/assigned/${this.technid}`).pipe( map(res => res.data));
  }


  putcheck(x:IcheckRequect){
    return this.http.put<IApiResponse<boolean>>("http://localhost:5038/api/TRequestEmergency",x);
  }



}
