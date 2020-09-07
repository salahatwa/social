import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from './../../../../shared/components/modal/dialog';
import { ProviderDto, TaskDto } from './../../../../shared/models/models';
import { ProviderService } from './../../../../shared/services/provider.service';
import { TaskService } from './../../../../shared/services/task.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {

  @Input() selectedProvidersIds: string[] = [];
  @Input() task: TaskDto;

  isSubmitting: boolean = false;
  providers: ProviderDto[] = [];

  totalElements: number;
  pageNo: number = 1;
  constructor(public activeModal: NgbActiveModal, private providerService: ProviderService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadProvider();
  }

  loadProvider(pageNo?: number) {
    this.providerService.getUserProviderList(pageNo).subscribe(data => {
      console.log(data);
      if (data?.providers && data?.providers.length !== 0) {
        Array.prototype.push.apply(this.providers, data.providers);
        pageNo++;
      }
      this.totalElements = data.totalElements;
    },
      err => {
        console.log(err);
      });
  }

  loadMore() {
    this.loadProvider(this.pageNo);
  }

  isSelectedProvider(id: string): boolean {
    const index: number = this.selectedProvidersIds.indexOf(id);
    if (index !== -1) {
      return true;
    }
    return false;
  }

  addProvider(provider: ProviderDto) {
    this.isSubmitting = true;

    this.taskService.addProviderToTask(this.task.id, provider.id).pipe(finalize(() => {
      this.isSubmitting = false;
    })).subscribe(data => {
      this.selectedProvidersIds.push(provider?.id);

    }, err => {

    });
  }

  removeProvider(provider: ProviderDto) {
    this.isSubmitting = true;
    this.taskService.removeProviderToTask(this.task.id, provider.id).pipe(finalize(() => {
      this.isSubmitting = false;
    })).subscribe(data => {
      const index: number = this.selectedProvidersIds.indexOf(provider.id);
      if (index !== -1) {
        this.selectedProvidersIds.splice(index, 1);
        console.log(this.selectedProvidersIds);
      }
    });
  }

  publishPost() {
    this.isSubmitting = true;
    this.taskService.testPostTask(this.task.id).pipe(finalize(() => {
      this.isSubmitting = false;
    })).subscribe(data => {
      console.log(data)
    });
  }

}
