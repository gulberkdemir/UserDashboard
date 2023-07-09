import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./user-management/users/users.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {UserEditComponent} from "./user-management/user-edit/user-edit.component";
import {UserComponent} from "./user-management/users/user/user.component";
import {UserManagementModule} from "./user-management/user-management.module";


const routes: Routes = [
  {
    path: '', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  }
];
//
//
// const routes: Routes = [
//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'admin', loadChildren: () => import('./admin-settings/admin-settings.module').then(x => x.AdminSettingsModule), canActivate: [AdminGuard] },
//   { path: 'upload-reporting', loadChildren: () => import('./upload-reporting/upload-reporting.module').then(x => x.UploadReportingModule)},
//   { path: 'create', component: CreateComponent },
//   { path: 'detail/:projectId', component: DetailComponent },
//   {
//     path: 'forecast/:projectId',
//     loadChildren: () => import('./forecast-and-actual/forecast-and-actual-container.module').then(x => x.ForecastAndActualContainerModule),
//     canActivate: [ForecastGuard],
//   },
//   { path: 'project/:projectId/business-case', loadChildren: () => import('./business-case/business-case.module').then(x => x.BusinessCaseModule) },
//   { path: 'benefit-reporting/:projectId', component: BenefitReportingComponent },
//   { path: '**', component: PageNotFoundComponent }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
