import { Component, OnInit, ViewChild, Inject, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DOCUMENT } from '@angular/common';
import { Observable, Subscription, timer } from 'rxjs';
import Swal from "sweetalert2";
@Component({
  selector: 'app-quiz-slide',
  templateUrl: './quiz-slide.component.html',
  styleUrls: ['./quiz-slide.component.css']
})
export class QuizSlideComponent implements OnInit {
  public userId: any = 0;
  private topicId: any = 0;
  public topic_name: any = '';
  public quizlist: any[] = [];
  public option = '';
  private allAnswers: any[] = [];
  public allques: any[] = [];
  submitBtn = false;
  public quiz = false;
  public addClass = false;
  public selectedval = '';
  afterSelect = false;
  elem: any;
  subscription2: any;
  secondsElapsed: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  formattedTime: string = '00:00';
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
  quizOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: false,
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
    autoHeight: true,
    autoWidth: false
  }

  // Method call to prevent right click on the page 
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: any) {
    event.preventDefault();
  }

  @ViewChild('owlCar', { static: false }) owlCar: any;
  constructor(private activatedR: ActivatedRoute, private _api: ApiServiceService, private _loader: NgxUiLoaderService, private _router: Router, @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.openFullscreen()
    this.topicId = this.activatedR.snapshot.paramMap.get('topicId');
    this.userId = JSON.parse(localStorage.getItem('userData') || '{}').id;
    /**
     * Method call to get questions topic wise
    */
    this._loader.startLoader('loader');
    this._api.getQuizTopicWise(this.topicId).subscribe((res: any) => {
      if (res.status == 1) {
        this.quizlist = res.questions;
        for (let i = 0; i < this.quizlist.length; i++) {
          this.allAnswers.push({ 'key': i + 1, 'value': '' })
          this.allques.push({ 'key': this.quizlist[i].id })
        }
        this._loader.stopLoader('loader')
      }
    })
    this.topic_name = localStorage.getItem('topicName');
    this.startTimer();
  }
  // Method call to open a page with full screen mode
  openFullscreen() {
    this.elem = document.documentElement;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    // Method call to prevent call any keyboard button on the page 
    // (window.navigator as any).keyboard.lock(["KeyR"]);
    // (window.navigator as any).keyboard.lock();

  }

  /**
   * Method call to get answer of quiz questions
   * @param index
   * @param event 
  */
  optionsSelect(i: number, event: any) {
    this.addClass = true;
    this.selectedval = event.target.value
    this.afterSelect = true
    this.quiz = true;
    // check answer is given or not
    this.allAnswers.forEach(el => {
      if (el.key == i + 1) {
        el.value = event.target.value
      }
    })
    //if slider is last then call to method to submit answer
    // if (this.submitBtn == true) {
    //   this.submitAns();
    // } else {
    //   let index = this.quizlist.findIndex(q => q.id == quesId) // check the index of the question arr
    //   let nextIndexId = this.quizlist[index + 1].id // get id of the next index of the question arr.
    //   // this.goToNextSlide(nextIndexId);
    // }
  }

  /**
    * Method call to go to next slide after choosing answer
   */

  goToNextSlide(nextIndexId: string) {
    // setTimeout(() => {
    //   this.quiz = false;
    //   this.afterSelect = false;
    //   this.owlCar.to(nextIndexId)
    // }, 1200);

  }

  /**
   * Method call after changeing slider
   * @param event 
   */
  getlastSlide(event: any) {
    if (this.quizlist.length - 1 == event.startPosition) {
      this.submitBtn = true;
    } else {
      this.submitBtn = false;
    }

  }

  // Method call to start time to calculate exam time
  startTimer() {
    const times = timer(0, 1000);; // Emit a value every 1000ms (1 second)
    this.subscription2 = times.subscribe(() => {
      this.secondsElapsed++;

      this.minutes = Math.floor(this.secondsElapsed / 60);
      this.seconds = this.secondsElapsed % 60;

      this.formattedTime = `${this.formatTimeUnit(this.minutes)}:${this.formatTimeUnit(this.seconds)}`;
    });
  }

  formatTimeUnit(timeUnit: number): string {
    return timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;
  }

  /**
   * Method call to submit all quiz answer
   */
  submitAns() {
    if ((localStorage.getItem('completed')) == 'true') {
      // this._router.navigate(['/user/courses'])
      this._router.navigate(['/user/result'], { skipLocationChange: true })
    } else {
      let questions = this.allques.map(x => x.key).toString();
      questions = questions.split(",").join("*")
      let answers = this.allAnswers.map(x => x.value).toString();
      answers = answers.split(",").join("*")
      let totalTime: any = (this.minutes * 60) + this.seconds;
      let answerData = new FormData();
      answerData.append('user_id', this.userId);
      answerData.append('topic_id', this.quizlist[0].topic_id);
      answerData.append('question_ids', questions);
      answerData.append('answers', answers);
      answerData.append('time', totalTime);
      this._loader.startLoader('loader');
      // call api to submit answer
      this._api.submitQuestionAns(answerData).subscribe((res: any) => {
        if (res.status == '1') {
          // call api to submit topics
          let topicData = new FormData();
          topicData.append('user_id', this.userId);
          topicData.append('course_id', this.quizlist[0].course_id);
          topicData.append('topic_id', this.quizlist[0].topic_id);
          this._api.submitTopics(topicData).subscribe((res1: any) => {
            if (res1.status == '1') {
              // call api to submit Course
              let Corse = new FormData();
              Corse.append('user_id', this.userId);
              Corse.append('course_id', this.quizlist[0].course_id);
              this._api.submitCourse(Corse).subscribe((res2: any) => {
                this._loader.stopLoader('loader');
              })
            } else {
              this._loader.stopLoader('loader');
              this.Toast.fire({
                icon: 'error',
                title: 'Something went wrong. Please try again'
              })

            }
          })
          localStorage.setItem('score', JSON.stringify(res))
          localStorage.setItem('topicId', this.quizlist[0].topic_id)
          this._router.navigate(['/user/result'], { skipLocationChange: true })
        } else {
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong. Please try again'
          })
        }
      })
    }
  }

  next() {
    this.quiz = false;
    this.afterSelect = false;
    this.addClass = false;
    if (this.submitBtn == true) {
      this.submitAns();
    } else {
      this.owlCar.next()
    }
  }

}
