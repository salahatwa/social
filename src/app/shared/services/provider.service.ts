import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ProviderDto, PageProviderDto } from './../../shared/models/models';
import { HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProviderService {


  constructor(private apiService: ApiService
  ) { }

  getUserProviderList(pageNo?: number, pageSize?: number, sortBy?: string): Observable<PageProviderDto> {
    let queryParameters = new HttpParams();
    if (pageNo !== undefined && pageNo !== null) {
      queryParameters = queryParameters.set('pageNo', <any>pageNo);
    }
    if (pageSize !== undefined && pageSize !== null) {
      queryParameters = queryParameters.set('pageSize', <any>pageSize);
    }
    if (sortBy !== undefined && sortBy !== null) {
      queryParameters = queryParameters.set('sortBy', <any>sortBy);
    }
    
    return this.apiService.get('/provider/accounts',queryParameters)
      .pipe(map(data => { return data; })
      );
  }


 



  public removeProviderById(id: string): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling removeProviderByIdUsingDELETE.');
    }
    return this.apiService.delete(`/provider/delete/${encodeURIComponent(String(id))}`);
  }



}
