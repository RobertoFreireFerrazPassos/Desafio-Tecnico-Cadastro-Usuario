import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

import { UserService } from 'src/app/core/services/user/user.service';
import { UserModel } from 'src/app/shared/models/user/user-model';
import { TypeAlert, MessageAlert, GenerateMessageAlert } from '../../shared/alertbox/altertMessage';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit  {
  users : UserModel[] = [];
  toggleActivationUserSubscription : Subscription;
  userEdited : UserModel;
  isLoading : boolean = false;
  messageTimer = timer(2000);
  messageAlert : MessageAlert = {
    message : "",
    type : TypeAlert.Unknown,
    active : false
  }

  constructor(private router : Router,
              private userService: UserService) { }

  ngOnInit() {
    const getUserSubscription = this.userService.getUsers().subscribe(users => {
      this.users = users;
      getUserSubscription.unsubscribe();
    });
  }

  editUser(user : UserModel) : void {
    if (this.isLoading) return;
    this.router.navigate(["/user"],{
      state : {
        user : user
      }
    });
  }

  toggleActivationToUser(userId: string): void {
    this.isLoading = true;
    this.userEdited = this.users.find(user => user.id === userId);
    this.toggleActivationUserSubscription = this.userService.toggleActivationUser({
      id : this.userEdited.id,
      active : this.userEdited.active
    }).subscribe(this.toggleActivationSuccessHandler, this.toggleActivationErrorHandler);
  }

  private toggleActivationSuccessHandler = () => {
    this.messageAlert = GenerateMessageAlert(TypeAlert.Success, "Usuário editado com sucesso!");
    if (this.toggleActivationUserSubscription) this.toggleActivationUserSubscription.unsubscribe();
    const subscribe = this.messageTimer.subscribe(() => {
      this.fadeOutAlertMessage();
      this.enableButtonsAgain();
      subscribe.unsubscribe();
    });
  }

  private replaceActiveValueUserEdited(activeValue : boolean) : void {
    const userEditedIndex = this.users.findIndex(user => user.id === this.userEdited.id);
    this.users[userEditedIndex] = {
      ... this.users[userEditedIndex],
      active : activeValue
    };
  }

  private toggleActivationErrorHandler = () => {
    this.messageAlert = GenerateMessageAlert(TypeAlert.Error, "Erro ao editar usuário!");
    if (this.toggleActivationUserSubscription) this.toggleActivationUserSubscription.unsubscribe();
    this.replaceActiveValueUserEdited(this.userEdited.active);
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

  getDate(dateString: string){
    const date = (new Date(dateString));
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
}
