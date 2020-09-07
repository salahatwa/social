import { Component, OnInit } from '@angular/core';
import { ProviderService } from './../../shared/services/provider.service';
import { UtilService } from './../../shared/services/util.service';
import { UserService } from './../../shared/services/user.service';
import { AlertService } from './../../shared/components/alert/alert.service';
import { ProviderDto, PageProviderDto } from './../../shared/models/models';
import { Constant } from './../../shared/utils/constant';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  pageConfig = {
    itemsPerPage: Constant.PAGINATION_MAX_RECS,
    currentPage: 1,
    totalItems: 0
  };
  isSubmitting: boolean = false;
  pageProvider: PageProviderDto;
  isLoading: boolean;

  constructor(private providerService: ProviderService, private utilService: UtilService,
    private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.loadProvider();
  }


  loadProvider(pageNo?: number) {
    this.isLoading = true;

    this.providerService.getUserProviderList(pageNo).pipe(finalize(() => {
      this.isLoading = false;
    })).subscribe(data => {
      this.pageProvider = data;
      this.pageConfig.totalItems = data.totalElements;
    },
      err => {
        console.log(err);
      });
  }

  pageChanged(event) {

    // this.isLoading = true;

    this.pageConfig.currentPage = event - 1;
    this.loadProvider(this.pageConfig.currentPage);

  }

  twitterLogin() {
    this.isSubmitting = true;
    this.userService
      .initTwitter('/provider/twitter/init')
      .subscribe(
        data => {
          this.isSubmitting = false;
          this.utilService.popupCenter({ url: data.authorizeUrl, w: 500, h: 500 });
        },
        err => {
          console.error(err);
          this.isSubmitting = false;
          this.alertService.error(err.message)
        }
      );
  }

  linkedLogin() {
    this.isSubmitting = true;
    this.userService
      .initLinkedIn('/provider/linkedIn/init')
      .subscribe(
        data => {
          this.isSubmitting = false;
          this.utilService.popupCenter({ url: data.authorizeUrl, w: 500, h: 500 });
        },
        err => {
          console.error(err);
          this.isSubmitting = false;
          this.alertService.error(err.message)
        }
      );
  }


  removeProvider(id: string, index: number) {
    this.providerService.removeProviderById(id).subscribe((data) => {
      this.pageProvider.providers.splice(index, 1);
      console.log("Done delete");
    });
  }
}
