import {ChangeDetectionStrategy, Component, OnChanges, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderService} from "../shared/services/header.service";
import {Observable} from "rxjs";
import {UserInterface} from "../shared/types/user.model";
import { faker } from '@faker-js/faker';
import {ApiService} from "../shared/services/api.service";
import {UserComponent} from "../user-management/users/user/user.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  urlObs$: Observable<string>;
  isUserPageObs$: Observable<boolean>;
  searchKeyword: string ='';

  constructor(
    private headerService: HeaderService,
    private apiService: ApiService
  ) {
    this.urlObs$ =this.headerService.url$.asObservable();
    this.isUserPageObs$ =this.headerService.isUsersPage$.asObservable();
  }


  changeText(e: any){
    this.headerService.searchKeywordSub$.next(this.searchKeyword);
  }

  createUser(){
    const newUser: UserInterface = {
      id: String(faker.number.int()),
      avatar: faker.image.avatar(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      street: faker.location.street(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    };
      this.apiService.createUser(newUser).subscribe();
      this.apiService.getAllUsers().subscribe();

  }

  SaveUser(){
    this.headerService.isSaveClicked$.next(true);
  }



}
