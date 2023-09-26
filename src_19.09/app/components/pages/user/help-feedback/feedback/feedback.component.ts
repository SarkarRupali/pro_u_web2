import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from "sweetalert2";
import { NgxUiLoaderService } from "ngx-ui-loader";

import { SpaceValidatior } from '../../../../../services/space.validator';
import { ApiServiceService } from 'src/app/services/api-service.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm !: FormGroup;
  userId: any;
  submitted = false;
  public Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  constructor(private location: Location, private _loader: NgxUiLoaderService, private _api: ApiServiceService) {
    this.feedbackForm = new FormGroup({
      title: new FormControl('', [Validators.required, SpaceValidatior.cannotContainSpace]),
      description: new FormControl('', [Validators.required, SpaceValidatior.cannotContainSpace])

    })
  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

  }

  get f() {
    return this.feedbackForm.controls;
  }


  // Method call to submit enquiry form
  submitForm() {
    this.submitted = true;
    if (this.feedbackForm.valid) {
      this._loader.startLoader('loader');
      let mainData = new FormData();
      mainData.append('user_id', this.userId);
      mainData.append('title', this.feedbackForm.value.title);
      mainData.append('description', this.feedbackForm.value.description)

      this._api.submitFeedbackForm(mainData).subscribe(
        res => {
          if (res.status == 1) {
            this._loader.stopLoader('loader');
            this.Toast.fire({
              icon: 'success',
              title: 'Successfully submitted.'
            })
            this.location.back();
          } else {
            this._loader.stopLoader('loader');
            this.Toast.fire({
              icon: 'error',
              title: 'Something went wrong. Please try again.'
            })

          }
        })

    }
  }
}