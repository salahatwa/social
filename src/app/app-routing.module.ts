import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

///pages/auth
const routes: Routes = [
  { path: '', loadChildren: () => import(`./pages/pages.module`).then(m => m.PagesModule)},
  { path: 'dashboard', loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
