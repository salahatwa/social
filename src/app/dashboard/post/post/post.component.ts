import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from './../../../shared/components/modal/dialog';
import { TaskDto } from './../../../shared/models/models';
import { TaskService } from './../../../shared/services/task.service';
import { ProviderListComponent } from './../post/provider-list/provider-list.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  isSubmitting: boolean;

  postForm: FormGroup;

  task: TaskDto;


  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private taskService: TaskService, private route: ActivatedRoute) {


    let taskId = this.route.snapshot?.params['id'];

    this.postForm = this.formBuilder.group({
      content: ['', Validators.required]
    });

    if (taskId) {

      if (taskId !== 'new') {
        this.taskService.getTask(taskId).subscribe((data) => {
          this.task = data;
          console.log(this.task);

          if (this.task) {
            console.log('>>>>>>>>>>>')
            this.postForm = this.formBuilder.group({
              content: [this.task.content, Validators.required]
            });
          }

        }, err => {

        });
      } else {
        this.task = {};
      }

    } else {
      //navigate to 404 NotFound
    }


  }

  ngOnInit(): void {
  }



  // convenience getter for easy access to form fields
  get f() { return this.postForm.controls; }

  onSubmit() {
    this.isSubmitting = true;

    // stop here if form is invalid
    if (this.postForm.invalid) {
      return;
    }

    // this.task=this.postForm?.value;
    Object.assign(this.task, this.postForm?.value);
    console.log(this.task);

    this.taskService.saveTask(this.task).subscribe((data => {
      this.task = data;
    }), err => {
      console.log(err);
    });
  }

  open() {
    const modalRef = this.modalService.open(ProviderListComponent, { scrollable: true });
    modalRef.componentInstance.selectedProvidersIds = this.task.providersId;
    modalRef.componentInstance.task = this.task;
    console.log(this.task);
  }

}
