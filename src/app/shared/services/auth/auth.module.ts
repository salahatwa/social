import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpTokenInterceptor } from './http.token.interceptor';
import { ShowAuthedDirective } from './show-authed.directive';



@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ShowAuthedDirective
  ],
  exports:[
    ShowAuthedDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ]
})
export class AuthModule {}
