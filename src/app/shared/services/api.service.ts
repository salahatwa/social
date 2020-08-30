import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { JwtService } from './auth/jwt.service';
import { Config } from '../config/config';
import { ApiError } from './../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  config = new Config();

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  private formatErrors(error: any) {
    let err: ApiError = error.error;
    return throwError(err);
  }


  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.get(`${this.config.api}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  getFile(path: string): Observable<ArrayBuffer> {
    return this.http.get(`${this.config.api}${path}`, {
      responseType: 'arraybuffer'
    });
  }

  postGetFile(path: string, body: Object = {}): Observable<ArrayBuffer> {
    return this.http.post(`${this.config.api}${path}`, body, {
      responseType: 'arraybuffer'
    });
  }

  openFile(path: string, body: Object = {}): Observable<Blob> {
    return this.http.post(`${this.config.api}${path}`, JSON.stringify(body), {
      responseType: 'blob'
    });
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.config.api}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.config.api}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.config.api}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
