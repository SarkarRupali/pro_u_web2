import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
import { ApiServiceService } from '../../../../../services/api-service.service';
import { environment } from '../../../../../../environments/environment';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { SpaceValidatior } from 'src/app/services/space.validator';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public university_id: any = '';
  public universityDetails: any = {};
  baseImgPath = 'https://backend.proueducation.com/assets/upload/countries/';
  statenumber: any = 0;
  showStatus: boolean = false;
  overviewstatus: boolean = false;
  campuslifestatus: boolean = false;
  accommodationstatus: boolean = false;

  overview() {
    this.overviewstatus = !this.overviewstatus;
  }
  campuslife() {
    this.campuslifestatus = !this.campuslifestatus;
  }
  accommodation() {
    this.accommodationstatus = !this.accommodationstatus;
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _api: ApiServiceService, private _loader: NgxUiLoaderService, private location: Location, private formBuilder: FormBuilder) {
    this.university_id = this.activatedRoute.snapshot.paramMap.get('id')
    //this._helper.presentLoading();
    this._api.universityDetails(this.university_id).subscribe((res: any) => {
      if (res.status == 1) {
        this.universityDetails = res.university
      }
    })
  }

  ngOnInit(): void {
  }

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 15,
    responsive: {
      0: {
        items: 1.1
      },
      400: {
        items: 2.1
      },
      760: {
        items: 3
      },
    },
    nav: false,
    autoHeight: false,
    autoWidth: false
  }

  courseDetails(course: any) {
    localStorage.setItem('courseDetails', JSON.stringify(course))
    this.router.navigateByUrl('/user/detailCourse')
  }
  changeStatus(index: number) {
    this.statenumber = index
    this.showStatus = !this.showStatus;
  }


}
