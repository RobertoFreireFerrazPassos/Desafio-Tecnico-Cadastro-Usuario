import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserModel } from '../../../shared/models/user/user-model';
import { UserHttpService } from '../../http/user/user-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userHttpService : UserHttpService) {
  }

  public getUsers() : Observable<UserModel[]>{
    return this.userHttpService.getUsers();
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
