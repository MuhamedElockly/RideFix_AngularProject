import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
    private userId: number | null = null;
    private Role:string|null=null;
    private url:string|null=null;
        private Name:string|null=null;


  setUserId(id: number) {
    this.userId = id;
  }


  getUserId(): number | null {
    return this.userId;
}

setUserimg(url:string ) {
    this.url = url;
  }


  getUserimg(): string | null {
    return this.url;
}


setUserName(Name:string) {
    this.Name = Name;
  }


  getUserName():string | null {
    return this.Name;
}



setUserRole(role: string) {
    this.Role = role;
  }


  getUserRole(): string | null {
    return this.Role;
}

}
