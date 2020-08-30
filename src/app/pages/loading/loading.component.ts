import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../shared/services/user.service';
import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loading: boolean;

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private userService: UserService,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.loading = true;
    //Subscription Method



    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);

      let oauth_token = params['oauth_token'];
      console.log(oauth_token);
      let oauth_verifier = params['oauth_verifier'];
      console.log(oauth_verifier);

      //Check twitter
      if (oauth_token || oauth_verifier) {
        this.userService.verifyTwitter('/auth/twitter/request-token',oauth_token, oauth_verifier).subscribe(
          (data) => {
            this.utilService.closeWindow();
            this.route.navigate(['/dashboard/']);
          }
        );
      }else{
        //check LinkedIn
        let linkedInToken = params["code"];
        console.log(linkedInToken);

        this.userService.verifyLinkedIn('/auth/linkedIn/request-token',linkedInToken).subscribe(
          (data) => {
            this.utilService.closeWindow();
            this.route.navigate(['/dashboard/']);
          }
        );
      }

    });

  }

}
