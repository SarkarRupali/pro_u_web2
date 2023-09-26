import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  userId: any;
  userData: any = {}
  educationalList: any = [];
  workList: any = []
  curriculamList: any = []
  isModalOpen: boolean = false;
  constructor(private _router: Router, private _loader: NgxUiLoaderService, private _api: ApiServiceService) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userData')!).id;

    this._loader.startLoader('loader');
    localStorage.removeItem('edu');
    localStorage.removeItem('work');
    localStorage.removeItem('extra');
    this.userDetails();
    // localStorage.removeItem('rec_course'),
    this._api.fetchEducationalList(this.userId).subscribe((res: any) => {
      console.log(res)
      if (res.status == '1') {
        this.educationalList = res.educational_experiences;
        this._loader.stopLoader('loader');
      }
    })

    this.getWorkExperience()
    this.getExtraCurriculamList()
  }

  // get userDetails
  userDetails() {
    this._api.prfileUser(this.userId).subscribe(res => {
      if (res.status == 1) {
        this.userData = res.user;
      }
    })
  }


  //fetch extra curriculamData
  getExtraCurriculamList() {
    this._api.fetchExtraCurriculamList(this.userId).subscribe(res => {
      console.log(res)
      if (res.status == '1') {
        this.curriculamList = res.extra_curriculars
      }
    })
  }

  //fetch Work Experience
  getWorkExperience() {
    this._api.fetchWorkList(this.userId).subscribe(res => {
      console.log(res)
      if (res.status == '1') {
        this.workList = res.work_experiences
      }
    })
  }

  //Go to educational add page
  uploadDocumnets() {
    // this.navCtrl.navigateForward('/upload-document')
  }

  updateDocumnets(edu: any) {
    localStorage.setItem('edu', JSON.stringify(edu))
    // this.navCtrl.navigateForward('/upload-document')
    this._router.navigate(['/user/education']);
  }

  //Go to Work Experience page
  uploadWorkExperience(work: any) {
    localStorage.setItem('work', JSON.stringify(work))
    this._router.navigate(['/user/work']);
  }

  //Go to curriculam
  saveExtraCurriculamData(extra: any) {
    localStorage.setItem('extra', JSON.stringify(extra))
    this._router.navigate(['/user/extraCurriculam']);
  }

  //save document for finance/health/visa/passport/otther
  saveDocumnets(type: any) {
    localStorage.setItem('type', type)
    this._router.navigate(['/user/docUpload']);
  }




}
