import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {UserInterface} from "../types/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {

  users$: Observable<UserInterface[]>;

  constructor(private api:ApiService) {
    this.users$ = this.api.getAllUsers();
  }



}
