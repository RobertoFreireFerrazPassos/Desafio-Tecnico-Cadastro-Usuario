import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { UserModel } from '../../../shared/models/user/user-model';
import { UserHttpService } from '../../http/user/user-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userHttpService : UserHttpService) {
  }

  public addUser(user : UserModel) : Observable<any>{
    user.active = true;
    return this.userHttpService.addUser(user);
  }
}

