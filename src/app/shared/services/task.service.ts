import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDto, PageTaskDto } from './../models/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService: ApiService) { }


  public getTask(id: number): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE.');
    }

    return this.apiService.get(`/task/${encodeURIComponent(String(id))}`
    );
  }

  public deleteTask(id: number): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE.');
    }

    return this.apiService.delete(`/task/${encodeURIComponent(String(id))}`
    );
  }

  /**
   * getAllUserTasks
   * 
   * @param pageNo pageNo
   * @param pageSize pageSize
   * @param sortBy sortBy
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllUserTasks(pageNo?: number, pageSize?: number, sortBy?: string): Observable<PageTaskDto> {

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

    return this.apiService.get(`/task/list`, queryParameters);
  }

  /**
   * save
   * 
   * @param taskDto taskDto
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public saveTask(taskDto: TaskDto): Observable<TaskDto> {

    if (taskDto === null || taskDto === undefined) {
      throw new Error('Required parameter taskDto was null or undefined when calling saveUsingPOST.');
    }
    return this.apiService.post(`/task`,
      taskDto
    );
  }

  public addProviderToTask(taskId: number,providerId:string): Observable<any> {

    if (taskId === null || taskId === undefined) {
      throw new Error('Required parameter id was null or undefined when calling removeProviderByIdUsingDELETE.');
    }
    return this.apiService.get(`/task/provider/${encodeURIComponent(String(taskId))}/${encodeURIComponent(String(providerId))}`);
  }

  public removeProviderToTask(taskId: number,providerId:string): Observable<any> {

    if (taskId === null || taskId === undefined) {
      throw new Error('Required parameter id was null or undefined when calling removeProviderByIdUsingDELETE.');
    }
    return this.apiService.delete(`/task/provider/${encodeURIComponent(String(taskId))}/${encodeURIComponent(String(providerId))}`);
  }


  public testPostTask(id: number): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deleteUsingDELETE.');
    }

    return this.apiService.post(`/publish/post/${encodeURIComponent(id)}`
    );
  }
}
