import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserModel } from 'src/app/shared/models/user/user-model';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {
  users : UserModel[] = [];

  constructor(private route : Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  editUser(id : string) : void {
    this.route.navigate(["/user"],{ queryParams : { id : id } });
  }

  toggleActivationToUser(id : string): void {
    const user = this.users.find(user => user.id === id);
    user.active = !user.active;
  }
}
