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
  selector: 'app-testpreppaper',
  templateUrl: './testpreppaper.component.html',
  styleUrls: ['./testpreppaper.component.css']
})
export class TestpreppaperComponent implements OnInit {


  allSubject: any = [];
  selectYear: any = '';
  selectType: any = '';
  selectedTime: any = 30;
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
    this.allSubject = JSON.parse(localStorage.getItem('subject')!)
    this.allSubject.forEach((el: any) => {
      el.year = '2022';
      el.type = '1';
    })

  }

  ngOnInit(): void {
  }

  selectedYear(subId: any, event: any) {
    this.allSubject.map((el: any) => {
      if (el.id == subId) {
        el.year = event.target.value;
      }
    })
    console.log('sub', this.allSubject)
  }

  selectedType(subId: any, event: any) {
    this.allSubject.map((el: any) => {
      if (el.id == subId) {
        el.type = event.target.value
      }
    })
  }



  // Method call to go to exam page
  goToExam() {
    if (this.selectedTime == 0) {
      //this._helper.presentToast('Please select time')
      this.Toast.fire({
        icon: 'warning',
        title: 'Please select time'
      })
    } else {
      let subId = ''
      let type = ''
      let years = ''
      this.allSubject.forEach((element: any) => {
        if (!element.type) {
          //this._helper.presentToast('Please choose queation type')
          this.Toast.fire({
            icon: 'warning',
            title: 'Please choose queation type'
          })
        }
        else if (!element.year) {
          //this._helper.presentToast('Please choose year')
          this.Toast.fire({
            icon: 'warning',
            title: 'Please choose year'
          })
        } else {
          type = this.allSubject.map((x: any) => x.type).toString();
          type = type.split(",").join("*")
          years = this.allSubject.map((x: any) => x.year).toString();
          years = years.split(",").join("*")
          subId = this.allSubject.map((x: any) => x.id).toString();
          subId = subId.split(",").join("*")
        }

      });
      const data = new FormData();
      data.append('subject_ids', subId);
      data.append('types', type);
      data.append('years', years)
      this._api.getTestQuestion(data).subscribe(res => {
        console.log(res)
        if (res.status == '1') {
          localStorage.setItem('question', JSON.stringify(res.all_questions))
          localStorage.setItem('selectedTime', this.selectedTime)
          this.router.navigateByUrl('/user/testprep-exam')
        }
      })
    }
  }

}
