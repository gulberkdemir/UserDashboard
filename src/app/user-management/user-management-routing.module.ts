import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {UserEditComponent} from "../user-detail/user-edit/user-edit.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  { path: 'dashboard/users', component: UsersComponent },
  { path: 'dashboard/users/:id', component: UserEditComponent},
  { path: '',   redirectTo: '/dashboard/users', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
