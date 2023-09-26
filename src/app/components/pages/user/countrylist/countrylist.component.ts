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
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.css']
})
export class CountrylistComponent implements OnInit {

  userDetails: any = {};
  public countryList:any  = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _api: ApiServiceService, private _loader: NgxUiLoaderService, private location: Location, private formBuilder: FormBuilder) {
    this._api.getCountryList().subscribe((res:any) => {
      if (res.status == 1) {
        this.countryList=res.countries
      }
    })
  }

  ngOnInit(): void {
  }

  goToCountryDetialsPage(id:any) {
    this.router.navigateByUrl('/user/country/' + id)
  }

}
