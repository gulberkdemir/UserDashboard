import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../types/user.model";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  usersSub$ = new BehaviorSubject<UserInterface[]>([])
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  createUser(user: UserInterface): Observable<UserInterface>{
    return this.http.post<UserInterface>("http://localhost:3000/userList/",user)
  }

  getAllUsers(): Observable<UserInterface[]>{
    return this.http.get<UserInterface[]>("http://localhost:3000/userList/")
      .pipe(tap(response => this.usersSub$.next(response)));
  }

  getUser(id: number): Observable<UserInterface>{
    return this.http.get<UserInterface>(`http://localhost:3000/userList/${id}`)
  }

  editUser(user: UserInterface, id: number): Observable<UserInterface>{
    return this.http.put<UserInterface>("http://localhost:3000/userList/"+id, user)
      .pipe(tap(response => this.router.navigate(['dashboard/users'], {relativeTo: this.route})));
  }
}
