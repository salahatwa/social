import { Component, OnInit } from '@angular/core';
import { ProviderService } from './../../shared/services/provider.service';
import { UtilService } from './../../shared/services/util.service';
import { UserService } from './../../shared/services/user.service';
import { AlertService } from './../../shared/components/alert/alert.service';
import { ProviderDto } from './../../shared/models/models';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  isSubmitting: boolean = false;
  providers: ProviderDto[];

  constructor(private providerService: ProviderService, private utilService: UtilService,
    private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.providerService.getUserProviderList().subscribe(data => {
      console.log(data);
      this.providers = data;
    },
      err => {
        console.log(err);
      });
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
      this.providers.splice(index, 1);
      console.log("Done delete");
    });
  }
}
