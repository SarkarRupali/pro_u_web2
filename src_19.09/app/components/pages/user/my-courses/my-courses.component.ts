import { Component, OnChanges, OnInit } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  public userId = 0;
  userDetails: any = {};
  ongoingCourse: any[] = [];
  completeCourse: any = [];
  testPrepList: any = [];
  courseOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 15,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      760: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
    nav: false,
    autoHeight: false,
    autoWidth: false

  }
  constructor(private _loader: NgxUiLoaderService, private _api: ApiServiceService, private _router: Router) { }

  ngOnInit(): void {

    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userId = this.userDetails.id;

    // }
    /**
     * Method call to get data about completed couse of users
    */

    // ngOnChanges(){
    this.completeCourse = [];
    this.ongoingCourse = [];
    this._loader.startLoader('loader');
    this._api.getUserCourse(this.userId).subscribe((res: any) => {

      if (res.status == '1') {
        // this.ongoingCourse = res.courses.filter(el => {
        //   if (el.completion_percentage != 100) return el
        // });
        res.courses.filter((el: any) => {
          if (el.completion_percentage == 100) this.completeCourse.push(el)
          else this.ongoingCourse.push(el)
        });
        this._loader.stopLoader('loader');
      }

    })

    this.getTestPrpList()
  }

  /**
   * Method call to go to details page
   */
  gotoDetailsPage(courseId: number, cousePrime: any) {
    if (cousePrime == '1') {
      if (this.userDetails.is_prime == '1') {
        this._router.navigateByUrl('/user/coursedetails/' + courseId)
      } else {
        this._router.navigateByUrl('/user/pricing')
      }
    } else {
      this._router.navigateByUrl('/user/coursedetails/' + courseId)
    }
  }

  // Method call to get test prep list for a user
  getTestPrpList() {
    this._api.testPrepList(this.userId).subscribe((result: any) => {
      if (result.status == '1') {
        this.testPrepList = result.exams
        this.testPrepList = this.testPrepList.reverse()
      }

    })
  }


  // Method call to get details of test prep
  goToTestDetialsPage(id: any) {
    localStorage.setItem('form', '')
    this._api.gettestPrepDetails(id).subscribe((result: any) => {
      if (result.status == '1') {
        localStorage.setItem('quizView', JSON.stringify(result?.exam_questions))
        this._router.navigateByUrl('/user/viewResult');
      }

    })

    // this.navCtrl.navigateForward('/tabs/menu/testprep-details/' + id)
  }

  // Method call to go to resume topic
  gotoresumeTopic(courseId: any, course: any) {
    localStorage.setItem('allTopic', JSON.stringify(course.topics));
    for (const el of course.topics) {
      if (el.is_completed == 0) {
        console.log('topic', el)
        if (el.assignment == '') {
          localStorage.setItem('topics', JSON.stringify(el))
          this._router.navigateByUrl('/user/topicslide', { skipLocationChange: true })
        } else this._router.navigateByUrl('/user/coursedetails/' + courseId)
        break;
      }

    }
  }


}
