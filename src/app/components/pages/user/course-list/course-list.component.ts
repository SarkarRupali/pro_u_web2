import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  public allCategoryList: any[] = [];
  public coursesWithCategories: any[] = [];
  public userDetails: any;
  public baseImage = environment.imageUrl;
  public categorylist: any = [];
  public type: any = '';
  public cattype: any;
  public countryList: any = []
  customOptions: OwlOptions = {
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
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 2
      },
      1000: {
        items: 2
      }
    },
    nav: true,
    autoHeight: true
  }

  customOptions2: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 15,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },

    },
    nav: false,
    autoHeight: false,
    autoWidth: false
  }

  baseImagePath = environment.imageUrl


  constructor(private _api: ApiServiceService, private _loader: NgxUiLoaderService, private _router: Router, private sanitizer: DomSanitizer) {
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}')

  }

  ngOnInit(): void {
    /**
      * Method is calling to fetch category and all course
    */
    this._loader.startLoader('loader');
    this.type = localStorage.getItem('coursename') == null ? this.type = 0 : localStorage.getItem('coursename');
    this._api.courseList().subscribe((res: any) => {
      if (res.status == "1") {
        this.coursesWithCategories = res.categories;
        this.allCategoryList = res.all_course;
        if (localStorage.getItem('coursename') != null) this.segmentChanged(localStorage.getItem('coursename'))
        this._loader.stopLoader('loader');

        this.allCategoryList.forEach((el: any) => {
          el.description = `<style>
      h2{
        font-size: 14px;
        font-weight: normal;
        color: #000;
        line-height: 1.4;
    }</style>`+ el.description
          el.description = this.sanitizer.bypassSecurityTrustHtml(el.description);
        });
      }
    })

    // api call to get country list
    this._api.getCountryList().subscribe(res => {
      if (res.status == 1) {
        this.countryList = res.countries
      }
    })
  }

  /**
  * Method call to go to categorywithcourse page
  */

  segmentChanged(ev: any) {
    this.type = ev;
    let data: any = [];

    data = this.coursesWithCategories.filter(el => el.id == ev);
    this.categorylist = [];
    if (data.length > 0) {
      this.categorylist = data[0].courses;
      this.categorylist.forEach((el: any) => {
        el.description = `<style>
    h2{
      font-size: 14px;
      font-weight: normal;
      color: #000;
      line-height: 1.4;
  }</style>`+ el.description
        el.description = this.sanitizer.bypassSecurityTrustHtml(el.description);
      });
    }
    else {
      this.categorylist = []
    }
  }

  /**
   * Method call to go to details page
   */
  gotoDetailsPage(courseId: number) {
    this._router.navigateByUrl('/user/coursedetails/' + courseId)
  }
  ngOnDestroy() {
    localStorage.removeItem('coursename')
  }

  goToCountryDetails(countryId: any) {
    console.log('countryId', countryId)
    this._router.navigateByUrl("/user/country/" + countryId)
  }

}
