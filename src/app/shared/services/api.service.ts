import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../types/user.model";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {apiURL} from "../types/application.constants";
import {SnackbarService} from "./snackbar.service";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  usersSub$ = new BehaviorSubject<UserInterface[]>([])


  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private snackbarService:SnackbarService) { }

  createUser(user: UserInterface): Observable<UserInterface>{
    return this.http.post<UserInterface>(`${apiURL}`,user).pipe(tap ( () => {
      this.snackbarService.openSnackBar('User was successfully created', SnackbarService.SUCCESS)
    }))
  }

  getAllUsers(): Observable<UserInterface[]>{
    return this.http.get<UserInterface[]>(`${apiURL}`)
      .pipe(tap(response => this.usersSub$.next(response)));
  }

  getUser(id: number): Observable<UserInterface>{
    return this.http.get<UserInterface>(`${apiURL}/${id}`)
  }

  editUser(user: UserInterface, id: number): Observable<UserInterface>{
    return this.http.put<UserInterface>(`${apiURL}/${id}`, user)
      .pipe(tap(response =>
      {this.router.navigate(['dashboard/users'], {relativeTo: this.route}) ;
        this.snackbarService.openSnackBar('User Information was successfully saved', SnackbarService.SUCCESS) }, () => {
          this.snackbarService.openSnackBar('User Information was not successfully saved', SnackbarService.ERROR)
          }
        )
      );
  }
}
