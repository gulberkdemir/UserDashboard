import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {HeaderService} from "../services/header.service";
import {Observable} from "rxjs";
import {UserInterface} from "../types/user.model";
import { faker } from '@faker-js/faker';
import {ApiService} from "../services/api.service";
import {UserComponent} from "../users/user/user.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  urlObs$: Observable<string>;
  isUserPageObs$: Observable<boolean>;

  constructor(
    private headerService: HeaderService,
    private apiService: ApiService
  ) {
    this.urlObs$ =this.headerService.url$.asObservable();
    this.urlObs$.subscribe(a => console.log(a));

    this.isUserPageObs$ =this.headerService.isUsersPage$.asObservable();
  }

  createUser(){
    const newUser: UserInterface = {
      id: faker.string.uuid(),
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



}
