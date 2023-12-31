import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {BehaviorSubject, filter, map, Observable} from "rxjs";
import {pagesEnum} from "../types/application.constants";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  url$ = new BehaviorSubject<string>('')

  isUsersPage$ = new BehaviorSubject<boolean>(true)

  searchKeywordSub$ = new BehaviorSubject<string>('')
  isSaveClicked$ = new BehaviorSubject<boolean>(false)



  constructor(
    private router: Router
  ) {


    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if(event.url === pagesEnum.usersPage || event.url === '/' ){
        this.url$.next(event.url)
        this.isUsersPage$.next(true)
      }else{
        this.url$.next(event.url)
        this.isUsersPage$.next(false)
      }
    });





  }
}
