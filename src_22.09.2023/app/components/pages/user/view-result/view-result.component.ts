import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  userId: any = {};
  quizlist: any = [];
  topic_name: any = '';
  previewBtn: boolean = false;
  submitBtn: boolean = false;
  public addClass = false;
  preBtn: boolean = false;
  page: any = ''
  quizOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    nav: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 10,
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
  @ViewChild('owlCar', { static: false }) owlCar: any;

  constructor(private _router: Router, private location: Location) { }

  ngOnInit(): void {
    this.page = localStorage.getItem('form') //, 'testPrep');
    this.userId = JSON.parse(localStorage.getItem('userData')!).id;
    // }

    // ionViewWillEnter() {
    this.quizlist = JSON.parse(localStorage.getItem('quizView')!)
    console.log('quizlist', this.quizlist)
    this.topic_name = localStorage.getItem('topicName');
    if (this.quizlist.length == 1) {
      // this.slideChanged();
      this.previewBtn = false;
    }
    if (this.quizlist[0]) {
      this.previewBtn = false;
    }
  }

  next() {
    // this.quiz = false;
    // this.afterSelect = false;
    // this.addClass = false;
    this.owlCar.next()
  }

  pre() {
    this.owlCar.prev()
  }

  /**
  * Method call after changeing slider
  * @param event 
  */
  getlastSlide(event: any) {
    console.log('event', event)
    if (this.quizlist.length - 1 == event.startPosition) {
      this.submitBtn = true;
    } else {
      this.submitBtn = false;
    }

    if (event.startPosition == 0) {
      this.preBtn = false;
    } else this.preBtn = true;


  }

  done() {
    console.log('page', this.page)
    if (this.page == 'testPrep') {
      // this._router.navigate(['/user/testprepsubject'], { skipLocationChange: true });
      this._router.navigate(['/user/testprepsubject']);
    } else this.location.back()
  }
}
