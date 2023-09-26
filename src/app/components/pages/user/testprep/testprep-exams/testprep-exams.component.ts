import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MathJaxService } from '../../../../../../math/mathjax.config';
import {MathjaxComponent} from '../../../../../mathjax/mathjax.component';

@Component({
  selector: 'app-testprep-exams',
  templateUrl: './testprep-exams.component.html',
  styleUrls: ['./testprep-exams.component.css']
})
export class TestprepExamsComponent implements OnInit {
  userId: any;
  allExams: any = [];
  examDuration: any = 0;
  countdown: any = 0;
  type: any = '';
  quizlist: any = [];
  allAnswers: any = [];
  allques: any = []
  countdownInterval: any;
  selectedval: any = '';
  quiz: boolean = false;
  addClass: boolean = false;
  indexnumber: any = 0;
  afterSelect: boolean = false;


  @ViewChild(MathjaxComponent) childView:any= MathjaxComponent;
  mathContent= `When $ a \\ne 0 $, there are two solutions to \\(ax^2 + bx + c = 0 \\) and they are
  $$ x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$`
  constructor(private _loader: NgxUiLoaderService, private _api: ApiServiceService, private router: Router, private mathJaxService: MathJaxService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData')!).id;

    // }

    // ionViewWillEnter() {
    this.allExams = JSON.parse(localStorage.getItem('question')!)
    this.type = this.allExams[0].subject?.id
    console.log('**1**', this.allExams)
    // this.activeSegment = this.allExams[0].subject.name
    let time: any = localStorage.getItem('selectedTime')
    this.examDuration = time
    this.countdown = this.examDuration * 60
    this.quizlist = this.allExams[0].questions;
    let allQuestion: any = []
    for (let i = 0; i < this.allExams.length; i++) {
      this.allExams[i].questions.forEach((el: any) => {
        allQuestion.push(el)
      })
    }

    for (let i = 0; i < allQuestion.length; i++) {
      this.allAnswers.push({ 'key': allQuestion[i].id, 'subId': allQuestion[i].subject_id, 'value': '' })
      this.allques.push({ 'key': allQuestion[i].id })
    }

    // console.log('this.allAnswers', this.allAnswers)

    // this.slideOption = this.questionSlide
    // this.slidenumber = this.slides
    this.startCountdown();

    // this.questions = this.quizlist[0]
  }

  ngOnChanges(changes: any): void {
    if (changes.mathExpression) {
      // this.mathContent = this.mathExpression;
      this.mathJaxService.typesetMath();
    }
  }

  // Method call to chnage segment
  segmentChanged(examId: any, ev: any) {
    this.type = examId;
    this.quizlist = this.allExams[ev].questions;
    this.afterSelect = false;
    // to get subject id
    let id = this.quizlist[0].subject_id;
    let findIndex = 0;

    for (let i = 0; i < this.allAnswers.length; i++) {
      if (this.allAnswers[i].subId == id && this.allAnswers[i].value == '') {
        findIndex = this.quizlist.findIndex((el: any) => el.id == this.allAnswers[i].key)
        this.quiz = false;
        this.addClass = false;
        break
      }
    }
    this.indexnumber = findIndex
    console.log('findIndex', findIndex)
  }

  // Method call to start timer
  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.stopCountdown();
      }
    }, 1000); // 1000 milliseconds = 1 second
  }

  stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
      this.submitAns()
    }
  }

  ngOnDestroy() {
    this.stopCountdown();
  }


  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  optionsSelect(qid: any, subId: any, event: any, i: any) {
    console.log('qid, subId, event', qid, subId, i);
    console.log('event', event);
    this.selectedval = event.target.value
    this.addClass = true
    this.quiz = true;
    this.indexnumber = i
    this.allAnswers.forEach((el: any) => {
      if (el.key == qid && el.subId == subId) {
        el.value = event.target.value
      }
    })
    this.afterSelect = true;
    console.log(' this.allAnswers', this.allAnswers)
  }

  next(index: any) {
    if (this.quizlist.length == index + 1) {
      console.log('allan', this.allAnswers)
      let ansIndex = this.allAnswers.findIndex((el: any) => el.value == '')
      if (ansIndex == -1) {
        this.submitAns()
      } else {
        // this.showAlert();
      }
    } else {
      this.indexnumber = index + 1
      console.log('indexnumber', this.indexnumber)
      let qid = this.quizlist[index + 1].id
      let qindex = this.allAnswers.findIndex((el: any) => el.key == qid)
      console.log('qindex', qindex)
      if (this.allAnswers[qindex].value == '') {
        this.quiz = false;
        this.afterSelect = false;
        this.addClass = false
      } else {
        this.selectedval = this.allAnswers[qindex].value
        this.afterSelect = true;
        this.quiz = true;
        this.addClass = true;
      }
    }
  }

  prev(index: any) {
    console.log('index', index)
    if (index != 0) {
      this.indexnumber = index - 1
      console.log('indexnumber', this.indexnumber)
      let qid = this.quizlist[index - 1].id
      let qindex = this.allAnswers.findIndex((el: any) => el.key == qid)
      console.log('qindex', qindex)
      if (this.allAnswers[qindex].value == '') {
        this.afterSelect = false;
        this.quiz = false;
        this.addClass = false
      } else {
        this.selectedval = this.allAnswers[qindex].value
        this.afterSelect = true;
        this.quiz = true;
        this.addClass = true;
      }
    }
    console.log(this.allAnswers)
  }

  submitAns() {
    let questions = this.allques.map((x: any) => x.key).toString();
    questions = questions.split(",").join("*")
    let answers = this.allAnswers.map((x: any) => x.value).toString();
    answers = answers.split(",").join("*")
    let exam_id = this.allExams.map((x: any) => x.subject.id).toString();
    exam_id = exam_id.split(",").join("*")
    let examTime: any = this.examDuration * 60
    console.log('exam_id', exam_id)
    let answerData = new FormData();
    answerData.append('user_id', this.userId);
    answerData.append('exam_id', exam_id);
    answerData.append('question_ids', questions);
    answerData.append('answers', answers);
    answerData.append('time', examTime);

    this._loader.startLoader('loader');
    // call api to submit answer
    this._api.submitTestPrepQuestionAns(answerData).subscribe((res: any) => {
      if (res.status == '1') {
        this._loader.stopLoader('loader');
        localStorage.setItem('score', JSON.stringify(res));
        localStorage.setItem('form', 'testPrep');
        // this.navCtrl.navigateForward('/score', { replaceUrl: true });
        this.router.navigateByUrl('/user/result', { skipLocationChange: true });
      } else {
        this._loader.stopLoader('loader');
      }
    })
  }


}
