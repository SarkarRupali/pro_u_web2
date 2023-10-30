import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-detailscourse',
  templateUrl: './detailscourse.component.html',
  styleUrls: ['./detailscourse.component.css']
})
export class DetailscourseComponent implements OnInit {
  courseDetails: any = {};
  userDetails: any = {};
  statenumber: any = 0;
  showStatus: boolean = false;
  showModuleStatus: boolean = false;
  applicationStatus: any = {};
  imagePath: any = "https://backend.proueducation.com/assets/upload/countries/"
  constructor(private _api: ApiServiceService) { }

  ngOnInit(): void {
    let course = JSON.parse(localStorage.getItem('courseDetails')!)
    this.userDetails = JSON.parse(localStorage.getItem('userData')!);

    this._api.universityCourseDetails(course.id).subscribe(res => {
      if (res.status == '1') {
        this.courseDetails = res.course
        this.statusApply()
      }
    })

  }

  statusApply() {
    this._api.getApplyCourseStatus(this.userDetails.id, this.courseDetails.id).subscribe((res: any) => {
      console.log('test', res)
      if (res.status == 1) {
        this.applicationStatus = res.third_party_course_application;
        // this.applyId = res.third_party_course_application.id
        // if (res.third_party_course_application.hs_file == '' && res.third_party_course_application.graduation_file == '') {
        //   this.studyFile = true;
        // } else {
        //   this.studyFile = false;
        //   this.graduateDoc = res.third_party_course_application.graduation_file;
        //   this.hsDoc = res.third_party_course_application.hs_file;
        //   localStorage.removeItem('doc')
        //   localStorage.removeItem('hsdoc')
        // }
        // this.applied = true;
      }
    })
  }

  changeStatus(index: any) {
    this.statenumber = index
    this.showStatus = !this.showStatus;
  }

  changeModuleStatus(index: any) {
    this.statenumber = index
    this.showModuleStatus = !this.showModuleStatus;

  }

}
