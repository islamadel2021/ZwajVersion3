import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForOf } from '../../../../node_modules/@angular/common/common_module.d-NEF7UaHr';
import { MemberCardComponent } from '../member-card/member-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-memberlists',
  templateUrl: './memberlists.component.html',
  styleUrls: ['./memberlists.component.css'],
  imports: [NgForOf, MemberCardComponent],
})
export class MemberlistsComponent implements OnInit {
  users: User[] = [];

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  alertService = inject(AlertifyService);

  constructor(
  ) {}

  ngOnInit() {
    // this.getUsers();
  this.route.data.subscribe((data) => {
      this.users = data['users'];
    
  }

  // getUsers() {
  //   this.userService.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //     },
  //     (error) => {
  //       this.alertService.error(error);
  //     },
  //   );
  // }
}
