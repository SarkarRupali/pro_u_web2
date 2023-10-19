import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {
  userId: any;
  topicId: any = 0;
  courseId: any = 0;
  showText: boolean = false;
  showText1: boolean = false;
  alltopic: any = [];
  constructor(private activatedR: ActivatedRoute, private _loader: NgxUiLoaderService, private _api: ApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData') || '{}').id;
    this._loader.startLoader('loader')
    this.topicId = this.activatedR.snapshot.paramMap.get('topicId')
    this.courseId = localStorage.getItem('courseId')
    // Method call to check question is present or not
    this._api.getQuizTopicWise(this.topicId).subscribe(res => {
      if (res.status == 1) {
        if (res.questions.length > 0) {
          this.showText = false;
          this.showText1 = true;
        } else {
          this.showText = true;
          this.showText1 = false;
        }
      }
      this._loader.stopLoader('loader');
    })
    this.alltopic = JSON.parse(localStorage.getItem('allTopic') || '{}')
  }


  // Method call to go continue page
  goToContinue(data: any) {
    let topicData = new FormData();
    topicData.append('user_id', this.userId);
    topicData.append('course_id', this.courseId);
    topicData.append('topic_id', this.topicId);
    this._api.submitTopics(topicData).subscribe((res1: any) => {
      let course = new FormData();
      course.append('user_id', this.userId);
      course.append('course_id', this.courseId);
      this._api.submitCourse(course).subscribe((res2: any) => {
        this._loader.stopLoader('loader');
        if (data == 'go') {
          if (this.alltopic[this.alltopic.length - 1].id === this.topicId) {
            this.router.navigate(['/user/coursedetails/' + this.courseId]);
          } else {
            const index = this.alltopic.findIndex((x: any) => x.id === this.topicId);
            if (this.alltopic[index].id == this.topicId && this.alltopic[index + 1].assignment == '') {
              localStorage.setItem('topics', JSON.stringify(this.alltopic[index + 1]))
              this.router.navigateByUrl('/user/topicslide', { skipLocationChange: true })
            } else {
              this.router.navigate(['/user/coursedetails/' + this.courseId]);
            }
          }
        } else this.router.navigate(['/']);

      })
    })
  }

  // Method call to go to quiz page
  goToquiz() {
    localStorage.setItem('form', '')
    this.router.navigateByUrl('/user/quizslide/' + this.topicId, { skipLocationChange: true })
  }
}
