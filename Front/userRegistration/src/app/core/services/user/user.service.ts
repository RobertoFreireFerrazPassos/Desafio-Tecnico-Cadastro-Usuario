import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserModel } from '../../../shared/models/user/user-model';
import { UserHttpService } from '../../http/user/user-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users : UserModel[] = [];
  onUsersUpdated : Subject<UserModel[]> = new Subject();

  constructor(private userHttpService : UserHttpService) {
    this.updateUsers();
  }

  public updateUsers(){
    this.onUsersUpdated.next(this.getUsers());
  }

  public getUsers() : UserModel[] {
    return [...this.users];
  }

  public addUser(user : UserModel) : Observable<any>{
    return this.userHttpService.addUser(user).pipe(
      tap(() => {this.users.push(user)})
    )
  }
}

