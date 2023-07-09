import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {UserInterface} from "../types/user.model";
import {HeaderService} from "../services/header.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit{

  users$: Observable<UserInterface[]>;


  constructor(private api:ApiService, private header:HeaderService) {
    // this.users$ = this.api.getAllUsers();

    this.users$ = this.api.usersSub$.asObservable();


  }

  trackBy(index: number, item: UserInterface) {
    return item.id;
  }

  ngOnInit() {
    this.api.getAllUsers().subscribe(k =>  this.api.usersSub$.next(k) )

  }


}
