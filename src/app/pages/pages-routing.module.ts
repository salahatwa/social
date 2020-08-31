import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingComponent } from './../pages/loading/loading.component';
import { SecureLoadingComponent } from './../pages/secure-loading/secure-loading.component';

const routes: Routes = [
  { path: 'notfound', component: NotFoundComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'secure_loading', component: SecureLoadingComponent },
  
  // { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
