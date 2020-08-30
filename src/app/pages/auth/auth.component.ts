import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from './../../shared/components/alert/alert.service';
import { UserService } from './../../shared/services/user.service';
import { UtilService } from './../../shared/services/util.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  toggleFormClass;

  isSubmitting = false;
  authForm: FormGroup;

  constructor(private router: Router, private utilService: UtilService, private fb: FormBuilder, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  showSignUp() {
    this.toggleFormClass = 'bounceLeft';
  }

  showLogin() {
    this.toggleFormClass = 'bounceRight';
  }

  login() {
    this.isSubmitting = true;
    this.userService
      .attemptAuth(this.authForm.value)
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
          this.isSubmitting = false;
        },
        err => {
          console.error(err);
          this.isSubmitting = false;
          this.alertService.error(err.message);
        }
      );
  }

  twitterLogin() {
    this.isSubmitting = true;
    this.userService
      .initTwitter('/auth/twitter/init')
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

  linkedLogin()
  {
    this.isSubmitting = true;
    this.userService
      .initLinkedIn('/auth/linkedIn/init')
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



}
