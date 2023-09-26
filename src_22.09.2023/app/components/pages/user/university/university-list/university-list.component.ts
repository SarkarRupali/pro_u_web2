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
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.css']
})
export class UniversityListComponent implements OnInit {

  userDetails: any = {};
  universityList: any = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _api: ApiServiceService, private _loader: NgxUiLoaderService, private location: Location, private formBuilder: FormBuilder) {

    // if (JSON.parse(localStorage.getItem('userData'))) {
    //   this.userDetails = JSON.parse(localStorage.getItem('userData'));
    // }
    /**
      * Method is calling to fetch all country list
    */
    //this._helper.presentLoading();
    this._api.getuniversityList().subscribe(res => {
      if (res.status == 1) {
        this.universityList = res.universities
      }
    })
  }

  ngOnInit(): void {
  }

  goToCountryDetialsPage(id:any) {
    this.router.navigateByUrl('/user/university/' + id)
  }

}
