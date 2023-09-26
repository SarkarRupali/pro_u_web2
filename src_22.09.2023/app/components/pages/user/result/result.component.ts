import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  scoreDetails: any = {};
  courseId: any = '';
  topic: any;
  alltopic: any = [];
  sec: any;
  min: any
  // Method call to prevent right click on the page 
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: any) {
    event.preventDefault();
  }

  constructor(private _router: Router, @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.scoreDetails = JSON.parse(localStorage.getItem('score') || '{}')
    let time = this.scoreDetails.time.split(':')
    console.log('time', time)
    this.min = time[0];
    this.sec = time[1];
    console.log('scoreDetails', this.scoreDetails)
    this.topic = localStorage.getItem('topicId')

    if (this.scoreDetails) this.scoreDetails.marks_percentage = Math.round(this.scoreDetails.marks_percentage)
    this.courseId = localStorage.getItem('courseId');

    this.alltopic = JSON.parse(localStorage.getItem('allTopic') || '{}')
  }

  // nextPage(courseId: any, data: any) {
  //   if (data == 'go') {
  //     if (this.alltopic[this.alltopic.length - 1].id === this.topic) {
  //       this._router.navigate(['/user/coursedetails/' + courseId]);
  //     } else {
  //       const index = this.alltopic.findIndex((x: any) => x.id === this.topic);
  //       if (this.alltopic[index].id == this.topic && this.alltopic[index + 1].assignment == '') {
  //         localStorage.setItem('topics', JSON.stringify(this.alltopic[index + 1]))
  //         this._router.navigateByUrl('/user/topicslide', { skipLocationChange: true })
  //       } else {
  //         this._router.navigate(['/user/coursedetails/' + courseId]);
  //       }
  //     }
  //   } else this._router.navigate(['/user/coursedetails/' + courseId]);

  //   this.closeFullscreen()
  //   // this._router.navigate(['/user/coursedetails/' + courseId]);

  // }
  // Method call to exit full screen of the page
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  viewResult() {
    this.closeFullscreen()
    localStorage.setItem('quizView', JSON.stringify(this.scoreDetails?.exam_questions))
    this._router.navigateByUrl('/user/viewResult');
  }

  returnHome() {
    console.log('Retun home')
    this._router.navigateByUrl('/user/dashboard', { skipLocationChange: true });

    this.closeFullscreen()
  }

}
