import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../types/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createUser(user: UserInterface): Observable<UserInterface>{
    return this.http.post<UserInterface>("http://localhost:3000/userList/",user);
  }

  getAllUsers(): Observable<UserInterface[]>{
    return this.http.get<UserInterface[]>("http://localhost:3000/userList/");
  }
}
