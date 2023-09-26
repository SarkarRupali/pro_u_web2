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

import { SpaceValidatior } from 'src/app/services/space.validator';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  public country_id: any = '';
  public countryDetails: any

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _api: ApiServiceService, private _loader: NgxUiLoaderService, private location: Location, private formBuilder: FormBuilder) {
    this.country_id = this.activatedRoute.snapshot.paramMap.get('id')

    //this._helper.presentLoading();
    this._api.countryDetails(this.country_id).subscribe((res: any) => {
      // console.log(res)
      if (res.status == 1) {
        this.countryDetails = res.country
        console.log("country " + JSON.stringify(res));
      }
    })
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

  ngOnInit(): void {


  }

  courseDetails(course:any){
    console.log(course)
    localStorage.setItem('courseDetails',JSON.stringify(course))
    this.router.navigateByUrl('/user/detailCourse')
  }
}
