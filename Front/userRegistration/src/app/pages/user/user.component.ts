import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user.service';

import { Gender, UserModel } from '../../shared/models/user/user-model';
import { TypeAlert, MessageAlert } from '../../shared/alertbox/altertMessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm : FormGroup;
  user : UserModel;
  genders : string[] = [Gender.Male,Gender.Female];
  isLoading : Boolean =  false;
  saveUserForsubscription : Subscription;
  isEditMode : Boolean =  false;
  messageAlert : MessageAlert = {
    message : "",
    type : TypeAlert.Unknown,
    active : false
  }
  messageTimer = timer(3000);

  constructor(private userService : UserService,
              private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      const routeState = this.router.getCurrentNavigation().extras.state;
      if (routeState && routeState.user) {
        this.user = routeState.user;
        console.log(this.user);
      }
    }
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'name' : new FormControl(this.user ? this.user.name : null, [Validators.required,Validators.minLength(3)]),
      'birthDate' : new FormControl(this.user ?
        {
          year: ( new Date(this.user.birthDate)).getFullYear(),
          month: ( new Date(this.user.birthDate)).getMonth(),
          day: ( new Date(this.user.birthDate)).getDay()
        } : null, Validators.required),
      'email' : new FormControl(this.user ? this.user.email : null, Validators.required),
      'password' : new FormControl(null),
      'gender' : new FormControl(this.user ? this.user.gender : null, Validators.required)
    });
  }

  deleteUser() : void{

  }

  saveUser() : void {
    this.isLoading = true;
    const user : UserModel = this.userForm.value;
    this.saveUserForsubscription = this.userService.addUser(user).subscribe(() => {
      this.messageAlert = {
        message : "Usuário salvo com sucesso!",
        active : true,
        type : TypeAlert.Success
      }
      this.afterUserServiceSubscription();
    },
    err => {
      this.messageAlert = {
        message : "Erro ao salvar usuário!",
        active : true,
        type : TypeAlert.Error
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
