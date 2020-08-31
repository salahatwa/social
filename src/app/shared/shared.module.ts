import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModule } from './components/alert/alert.module';
import { AuthModule } from './services/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from './components/pagination/pagination.module';
import { NgbModalModule } from './components/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    AuthModule,
    PaginationModule,
    NgbModalModule
  ],
  declarations: [
  ],
  providers: [],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    AuthModule,
    PaginationModule,
    NgbModalModule
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
