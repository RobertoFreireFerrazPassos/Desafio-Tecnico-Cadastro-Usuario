import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserModel } from '../../../shared/models/user/user-model';
import { UserHttpService } from '../../http/user/user-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users : UserModel[] = [
    {
      "id" : "bc5aad87-f57f-4559-ba75-520edb2404ac",
      "name": "Roberto",
      "birthDate": new Date('5/8/1992'),
      "email": "test@gmail.com",
      "password": "",
      "gender": "Masculino",
      "active": true
    },
    {
      "id" : "fcffd589-377e-4cd6-b801-1d90902d0894",
      "name": "Maria",
      "birthDate": new Date('5/8/1996'),
      "email": "test2@gmail.com",
      "password": "",
      "gender": "Feminino",
      "active": false
    }
  ];

  constructor(private userHttpService : UserHttpService) {
  }

  public getUsers(user : UserModel) : Observable<UserModel[]>{
    return this.userHttpService.getUsers(user).pipe(
      tap(res => {this.users = res})
    );
  }

  public deleteUser(user : UserModel) : Observable<UserModel>{
    return this.userHttpService.deleteUser(user);
  }

  public editUser(user : UserModel) : Observable<UserModel>{
    return this.userHttpService.editUser(user);
  }

  public addUser(user : UserModel) : Observable<UserModel>{
    user.active = true;
    return this.userHttpService.addUser(user);
  }
}
