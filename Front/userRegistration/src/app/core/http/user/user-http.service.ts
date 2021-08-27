import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/shared/models/user/user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  rootPath = '';

  constructor(private http : HttpClient) { }

  public getUsers(user : UserModel) : Observable<any>{
    return this.http.get(this.rootPath + "/user/get");
  }

  public deleteUser(user : UserModel) : Observable<any>{
    return this.http.get(this.rootPath + "/user/delete?id=" + user.id);
  }

  public editUser(user : UserModel) : Observable<any>{
    return this.http.post(this.rootPath + "/user/edit", user);
  }

  public addUser(user : UserModel) : Observable<any>{
    return this.http.post(this.rootPath + "/user/add", user);
  }
}
