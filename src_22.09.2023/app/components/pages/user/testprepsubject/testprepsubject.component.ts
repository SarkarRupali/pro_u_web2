import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
import { ApiServiceService } from '../../../../services/api-service.service';
import { environment } from '../../../../../environments/environment';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testprepsubject',
  templateUrl: './testprepsubject.component.html',
  styleUrls: ['./testprepsubject.component.css']
})
export class TestprepsubjectComponent implements OnInit {

  exam: any = {};
  module: any = {};
  selectSub: any = [];
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _api: ApiServiceService, private _loader: NgxUiLoaderService, private location: Location, private formBuilder: FormBuilder) { 
    //this._helper.presentLoading();
    this.exam = JSON.parse(localStorage.getItem('detail')!)
    this.module = JSON.parse(localStorage.getItem('module')!)
  }

  ngOnInit(): void {
  }

  


  checkSub(event: any) {
    console.log('event', event);
    console.log('ce', event.target.checked);
    if (event.target.checked == true) {
      if (this.selectSub.indexOf(event.target.value) === -1) this.selectSub.push(event.target.value)
    } else {
      const index = this.selectSub.indexOf(event.target.value);
      if (index > -1) { // only splice array when item is found
        this.selectSub.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
  }

  // Method call to go to next exam page
  testPrepExam() {
    if (this.selectSub.length > 0) {
      let chooseSub: any = [];
      this.exam.subjects.forEach((el:any) => {
        if (this.selectSub.some((el2:any) => el.id == el2)) {
          chooseSub.push(el)
        }
      })
      localStorage.setItem('subject', JSON.stringify(chooseSub))
      this.router.navigateByUrl('/user/testpreppaper')
    } else {
      //this._helper.presentToast('Please choose atleast one subject')
      this.Toast.fire({
        icon: 'warning',
        title: 'Please choose atleast one subject'
      })
    }

  }

}
