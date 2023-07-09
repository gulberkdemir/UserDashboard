import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Observable, Subscription} from "rxjs";
import {UserInterface} from "../types/user.model";
import {HeaderService} from "../services/header.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy{

  users$: Observable<UserInterface[]>;
  searchKeyword: string ='';

  private filterSubscription: Subscription;


  constructor(private api:ApiService, private header:HeaderService) {
    // this.users$ = this.api.getAllUsers();

    this.users$ = this.api.usersSub$.asObservable();
    this.filterSubscription = this.header.searchKeywordSub$.subscribe( kword => this.searchKeyword = kword)

  }

  trackBy(index: number, item: UserInterface) {
    return item.id;
  }

  ngOnInit() {
    this.api.getAllUsers().subscribe();

  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }


}
