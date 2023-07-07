import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {HeaderService} from "../services/header.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  urlObs$: Observable<string>;
  isUserPageObs$: Observable<boolean>;
  constructor(
    private headerService: HeaderService
  ) {
    this.urlObs$ =this.headerService.url$.asObservable();
    this.urlObs$.subscribe(a => console.log(a));

    this.isUserPageObs$ =this.headerService.isUsersPage$.asObservable();
  }

}
