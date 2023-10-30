import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  course: any;
  userDetails: any = {};
  applyId: any = '';
  applied: boolean = false;
  studyFile: boolean = false
  hsDoc: any = ''
  graduateDoc: any = ''
  applicationStatus: any = {};
  basePath = "https://backend.proueducation.com/assets/upload/users/"

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

  constructor(private _loader: NgxUiLoaderService, private _api: ApiServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.course = JSON.parse(localStorage.getItem('courseDetails')!)
    console.log('course', this.course)
    this.userDetails = JSON.parse(localStorage.getItem('userData')!);
    this.applyCoursestatus();

    if (localStorage.getItem('hsdoc') !== null) {
      this.hsDoc = localStorage.getItem('hsdoc')
    }
    if (localStorage.getItem('doc') !== null) {
      this.graduateDoc = localStorage.getItem('doc')
    };
  }


  // Method call to get applu all apply status for course
  applyCoursestatus() {
    this._loader.startLoader('loader');
    this._api.getApplyCourseStatus(this.userDetails.id, this.course.id).subscribe((res: any) => {
      console.log(res)
      if (res.status == 1) {
        this._loader.stopLoader('loader');
        this.applicationStatus = res.third_party_course_application;
        this.applyId = res.third_party_course_application.id
        if (res.third_party_course_application.hs_file == '' && res.third_party_course_application.graduation_file == '') {
          this.studyFile = true;
        } else {
          this.studyFile = false;
          this.graduateDoc = res.third_party_course_application.graduation_file;
          this.hsDoc = res.third_party_course_application.hs_file;
          localStorage.removeItem('doc')
          localStorage.removeItem('hsdoc')
        }
        this.applied = true;
      } else {
        this.applyFirst()
      }
    })
  }

  // Method call to apply for third part course
  applyFirst() {
    const applyData = new FormData();
    applyData.append('user_id', this.userDetails.id)
    applyData.append('course_id', this.course.id)
    applyData.append('university_id', this.course.university_id)
    this._api.applyThirdParty(applyData).subscribe(res => {
      console.log(res)
      if (res.status == 1) {
        this.applyId = res.id
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'success',
          title: res?.message
        });
      }
    })
  }


  async upload(type: any) {
    localStorage.setItem('type', type)
    localStorage.setItem('applyId', this.applyId)
    this._router.navigate(['/user/docUpload']);
  }

  // Method call to upload file in database
  submitFile() {
    this._loader.startLoader('loader');
    const applyData = new FormData();
    applyData.append('id', this.applyId)
    applyData.append('hs_file', this.hsDoc)
    applyData.append('graduation_file', this.graduateDoc)
    this._api.applyEduDocument(applyData).subscribe(res => {
      console.log(res)
      if (res.status == 1) {
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'success',
          title: res?.message
        });
        this.applyCoursestatus()
      }
    })
  }

  finalSubmit() {
    this._loader.startLoader('loader');
    const enrollData = new FormData();
    enrollData.append('id', this.applyId)
    this._api.applyEnrollDocument(enrollData).subscribe(res => {
      console.log(res)
      if (res.status == 1) {
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'success',
          title: res?.message
        });
        this.applyCoursestatus()
      }
    })
  }


}
