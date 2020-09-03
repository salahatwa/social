import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from './../../../shared/components/modal/dialog';
import { TaskDto } from './../../../shared/models/models';
import { TaskService } from './../../../shared/services/task.service';
import { ProviderListComponent } from './../post/provider-list/provider-list.component';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { formatDate } from '@angular/common';
import { AlertService } from './../../../shared/components/alert/alert.service';

export interface DateTime {
  date: string;
  time: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  alert = { id: 'POST' + Math.random().toString(36).substring(2) };



  dateTimeOptions: FlatpickrOptions = {
    defaultDate: formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US'),
    enableTime: true,
    minDate: "today",
    utc: true
  }

  isSubmitting: boolean;

  postForm: FormGroup;

  task: TaskDto;


  constructor(private alertService: AlertService, private modalService: NgbModal, private formBuilder: FormBuilder, private taskService: TaskService, private route: ActivatedRoute) {


  }

  ngOnInit(): void {

    let taskId = this.route.snapshot?.params['id'];

    this.postForm = this.formBuilder.group({
      content: ['', Validators.required],
      dateTime: [formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US'), Validators.required],
      enabled: [false, Validators.required],
      timezoneOffset:[0]
    });

    if (taskId) {

      if (taskId !== 'new') {
        this.taskService.getTask(taskId).subscribe((data) => {
          this.task = data;
          console.log(this.task);

          this.postForm = this.formBuilder.group({
            content: [this.task.content, Validators.required],
            dateTime: [this.task.date + " " + this.task.time, Validators.required],
            enabled: [this.task.enabled, Validators.required],
            timezoneOffset:[this.task.timezoneOffset]
          });


        }, err => {
          this.alertService.error(err.msg, this.alert);
        });
      } else {
        this.task = {};
        this.postForm = this.formBuilder.group({
          content: ['', Validators.required],
          dateTime: [formatDate(Date.now(), 'yyyy-MM-dd HH:mm', 'en-US'), Validators.required],
          enabled: [false, Validators.required],
          timezoneOffset:[0]
        });
      }

    } else {
      //navigate to 404 NotFound
    }



  }



  // convenience getter for easy access to form fields
  get f() { return this.postForm.controls; }

  onSubmit() {
    this.isSubmitting = true;

    // this.postForm.date
    // console.log(this.postForm?.value);

    // stop here if form is invalid
    if (this.postForm.invalid) {
      return;
    }


    Object.assign(this.task, this.postForm?.value);
    // this.omit(this.task, 'dateTime');


    this.task.date = formatDate(this.f['dateTime'].value, 'yyyy-MM-dd', 'en-US');
    this.task.time = formatDate(this.f['dateTime'].value, 'HH:mm', 'en-US');


    // Object.assign(this.task, this.dateTimeObj);
    // console.log(this.dateTimeObj.date);
    console.log(this.task);

    this.taskService.saveTask(this.task).subscribe((data => {
      this.task = data;
      this.alertService.success("Success created task", this.alert);
    }), err => {
      console.log(err);
      this.alertService.error(err.msg, this.alert);
    });
  }


  omit(obj, omitKey) {
    return Object.keys(obj).reduce((result, key) => {
      if (key !== omitKey) {
        result[key] = obj[key];
      }
      return result;
    }, {});
  }


  open() {
    const modalRef = this.modalService.open(ProviderListComponent, { scrollable: true });
    modalRef.componentInstance.selectedProvidersIds = this.task.providersId;
    modalRef.componentInstance.task = this.task;
    console.log(this.task);
  }

}
