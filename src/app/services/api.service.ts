import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../types/user.model";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  usersSub$ = new BehaviorSubject<UserInterface[]>([])

  constructor(private http: HttpClient) { }

  createUser(user: UserInterface): Observable<UserInterface>{
    return this.http.post<UserInterface>("http://localhost:3000/userList/",user)
  }

  getAllUsers(): Observable<UserInterface[]>{
    return this.http.get<UserInterface[]>("http://localhost:3000/userList/")
      .pipe(tap(response => this.usersSub$.next(response)));
  }

  editUser(user: UserInterface, id: number): Observable<UserInterface>{
    return this.http.put<UserInterface>("http://localhost:3000/userList/"+id, user);
  }
}
