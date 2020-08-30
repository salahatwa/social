import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { SecureLoadingComponent } from './../pages/secure-loading/secure-loading.component';

@NgModule({
  imports: [
    SharedModule,
    PagesRoutingModule
  ],
  declarations: [NotFoundComponent, AuthComponent, LoadingComponent,SecureLoadingComponent]
})
export class PagesModule { }
