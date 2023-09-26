import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";

import { Location } from '@angular/common';
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-filter-data',
  templateUrl: './filter-data.component.html',
  styleUrls: ['./filter-data.component.css']
})
export class FilterDataComponent implements OnInit {
  userDetails: any = {};
  filterList: any = [];
  imagePath = 'https://backend.proueducation.com/assets/upload/countries/';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _api: ApiServiceService, private _loader: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this._loader.startLoader('loader');
    this.filterList = JSON.parse(localStorage.getItem('filterResult')!)
    console.log('test', this.filterList)
    this._loader.stopLoader('loader');
  }

  goToDetialsPage(course: any) {
    localStorage.setItem('courseDetails', JSON.stringify(course))
    this.router.navigateByUrl('/user/detailCourse')
  }

}
