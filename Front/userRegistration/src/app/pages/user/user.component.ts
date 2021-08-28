import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';

import { UserService } from 'src/app/core/services/user/user.service';
import { Gender, UserModel } from '../../shared/models/user/user-model';
import { TypeAlert, MessageAlert, GenerateMessageAlert } from '../../shared/alertbox/altertMessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm : FormGroup;
  user : UserModel;
  EMPTY_GUID : string = "00000000-0000-0000-0000-000000000000";
  genders : string[] = [Gender.Male,Gender.Female];
  isLoading : Boolean =  false;
  saveUserSubscription : Subscription;
  deleteUserSubscription :Subscription;
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

  isEditMode() : Boolean {
    return this.user && this.user.id && this.user.id != this.EMPTY_GUID;
  }

  deleteUser() : void {
    this.isLoading = true;
    const user = this.convertUserFromUserForm();
    this.deleteUserSubscription = this.userService.deleteUser(user.id).subscribe(this.deleteSuccessHandler, this.deleteErrorHandler);
  }

  private deleteSuccessHandler = () => {
    this.messageAlert = GenerateMessageAlert(TypeAlert.Success, "Usuário removido com sucesso!");
    if (this.deleteUserSubscription) this.deleteUserSubscription.unsubscribe();
    this.userForm.reset();

    const subscribe = this.messageTimer.subscribe(() => {
      this.fadeOutAlertMessage();
      this.enableButtonsAgain();
      this.navigateToReport();
      subscribe.unsubscribe();
    });
  }

  private deleteErrorHandler = () => {
    this.messageAlert = GenerateMessageAlert(TypeAlert.Error, "Erro ao remover usuário!");
    if (this.deleteUserSubscription) this.deleteUserSubscription.unsubscribe();

    const subscribe = this.messageTimer.subscribe(() => {
      this.fadeOutAlertMessage();
      this.enableButtonsAgain();
      subscribe.unsubscribe();
    });
  }

  saveUser() : void {
    this.isLoading = true;
    const user = this.convertUserFromUserForm();
    if (this.isEditMode()){
      this.saveUserSubscription = this.userService.editUser(user).subscribe(this.addOrEditSuccessHandler, this.addOrEditErrorHandler);
    } else {
      this.saveUserSubscription = this.userService.addUser(user).subscribe(this.addOrEditSuccessHandler, this.addOrEditErrorHandler);
    }
  }

  private addOrEditSuccessHandler = () => {
    this.messageAlert = GenerateMessageAlert(TypeAlert.Success, "Usuário salvo com sucesso!");
    if (this.saveUserSubscription) this.saveUserSubscription.unsubscribe();

    const subscribe = this.messageTimer.subscribe(() => {
      this.fadeOutAlertMessage();
      this.enableButtonsAgain();
      this.navigateToReport();
      subscribe.unsubscribe();
    });
  }

  private addOrEditErrorHandler = () => {
    this.messageAlert = GenerateMessageAlert(TypeAlert.Error, "Erro ao salvar usuário!");
    if (this.saveUserSubscription) this.saveUserSubscription.unsubscribe();

    const subscribe = this.messageTimer.subscribe(() => {
      this.fadeOutAlertMessage();
      this.enableButtonsAgain();
      subscribe.unsubscribe();
    });
  }

  private fadeOutAlertMessage(){
    this.messageAlert.active = false;
  }

  private enableButtonsAgain(){
    this.isLoading = false;
  }

  private navigateToReport(){
    this.router.navigate(["/report"]);
  }

  private convertUserFromUserForm() : UserModel{
    const user : UserModel = this.userForm.value;
    user.id = (this.user && this.user.id) ? this.user.id : this.EMPTY_GUID;
    return user;
  }
}
