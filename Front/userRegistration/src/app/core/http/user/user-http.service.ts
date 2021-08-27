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

  public addUser(user : UserModel) : Observable<any>{
    return this.http.post(this.rootPath + "/addUser", user);
  }
}
