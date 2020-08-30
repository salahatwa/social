import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ProviderDto } from './../../shared/models/models';



@Injectable({
  providedIn: 'root'
})
export class ProviderService {


  constructor(private apiService: ApiService,
  ) { }

  getUserProviderList(): Observable<ProviderDto[]> {
    return this.apiService.get('/provider/accounts')
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
