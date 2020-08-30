import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './shared/services/auth/auth-guard.service';
import {NoAuthGuard} from './shared/services/auth/no-auth-guard.service';
///pages/auth
const routes: Routes = [
  { path: '', redirectTo:"dashboard" ,pathMatch:"full"},
  { path: '', loadChildren: () => import(`./pages/pages.module`).then(m => m.PagesModule),canActivate:[NoAuthGuard]},
  { path: 'dashboard', loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule),canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
