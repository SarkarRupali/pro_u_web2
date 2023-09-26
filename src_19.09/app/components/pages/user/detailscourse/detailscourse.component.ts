import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-detailscourse',
  templateUrl: './detailscourse.component.html',
  styleUrls: ['./detailscourse.component.css']
})
export class DetailscourseComponent implements OnInit {
  courseDetails: any = {};
  statenumber: any = 0;
  showStatus: boolean = false;
  constructor(private _api: ApiServiceService) { }

  ngOnInit(): void {
    let course = JSON.parse(localStorage.getItem('courseDetails')!)
    console.log('courseDetails', this.courseDetails)
    this._api.universityCourseDetails(course.id).subscribe(res => {
      console.log(res)
      if (res.status == '1') {
        this.courseDetails = res.course
      }
    })

  }

  changeStatus(index: any) {
    this.statenumber = index
    this.showStatus = !this.showStatus;
  }


}
