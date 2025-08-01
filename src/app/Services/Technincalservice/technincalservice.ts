import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../UserStorageService/user-storage-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Technincalservice {
    constructor(private http:HttpClient,private userStorage:UserStorageService){}

    //get the userid
    gettechnician(){
    const technid=localStorage.getItem('techid');
  console.log(technid);
      return this.http.get<any>(`http://localhost:5038/api/Account/technicianDetails/${technid}`).pipe( map(res => res.data));
    }


}
