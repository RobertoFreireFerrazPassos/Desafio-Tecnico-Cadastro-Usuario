import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';

import { Gender, UserModel } from '../../shared/models/user/user-model';
import { TypeMessage } from '../../shared/alertbox/typeMessage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm : FormGroup;
  genders : string[] = [Gender.Male,Gender.Female];
  isLoading : Boolean =  false;
  saveUserForsubscription : Subscription;
  messageAlert = {
    message : "",
    type : "",
    active : false
  }
  messageTimer = timer(3000);

  constructor(private userService : UserService) {
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'name' : new FormControl(null, [Validators.required,Validators.minLength(3)]),
      'birthDate' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, null),
      'gender' : new FormControl(null, Validators.required)
    });
  }

  saveUserForm() : void {
    this.isLoading = true;
    const user : UserModel = this.userForm.value;
    this.saveUserForsubscription = this.userService.addUser(user).subscribe(() => {
      this.messageAlert = {
        message : "Usuário salvo com sucesso!",
        active : true,
        type : TypeMessage.Success
      }
      this.afterUserServiceSubscription();
    },
    err => {
      this.messageAlert = {
        message : "Erro ao salvar usuário!",
        active : true,
        type : TypeMessage.Error
      }
      this.afterUserServiceSubscription();
    });
  }

  private afterUserServiceSubscription(){
    this.saveUserForsubscription.unsubscribe();
    const subscribe = this.messageTimer.subscribe(() => {
      this.messageAlert.active = false;
      this.isLoading = false;
      subscribe.unsubscribe();
    });
  }
}
