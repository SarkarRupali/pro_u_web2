import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
import { ApiServiceService } from '../../../../services/api-service.service';
import { environment } from '../../../../../environments/environment';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SpaceValidatior } from 'src/app/services/space.validator';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CourseDetailsComponent implements OnInit {
  public forumForm!: FormGroup;
  public submitted = false;
  courseId: any = '';
  userId: any = '';
  formAnsId: any = 0;
  course_details: any = {};
  public testimonials: any[] = [];
  public alltopics: any[] = [];
  public forums: any[] = [];
  public relatedCourse: any[] = [];
  public forumCheck = false;
  public topicAnswer = '';
  public answer = '';
  public imagePath = environment.imageUrl;
  public userDetails: any;
  public page: any = 'tutor';
  public totalSlideLength = 0;
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

  certificates: any = []

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 10,
    responsive: {
      0: {
        items: 1.1
      },
      400: {
        items: 1.4
      },
      760: {
        items: 3
      },

    },
    nav: false,
    autoHeight: false,
    autoWidth: true
  }


  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 15,
    responsive: {
      0: {
        items: 1.1
      },
      768: {
        items: 2
      },
      1280: {
        items: 3
      }
    },
    nav: false,
    autoHeight: false,
    autoWidth: false
  }

  customOptions3: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 15,
    responsive: {
      0: {
        items: 1.1
      },
      768: {
        items: 3
      },
      1280: {
        items: 4
      }
    },
    nav: false,
    autoHeight: false,
    autoWidth: false
  }


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _api: ApiServiceService, private _loader: NgxUiLoaderService, private location: Location, private formBuilder: FormBuilder) {

    this.userId = JSON.parse(localStorage.getItem('userData') || '{}').id;
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  ngOnInit(): void {
    this.forumForm = this.formBuilder.group({
      forumContent: new FormControl('', [Validators.required, SpaceValidatior.cannotContainSpace]),
    })
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    this.activatedRoute.params.subscribe(val => {
      this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
      // put the code to initialize the page

      /**
      * method call to get courseDetials
      */
      // ionViewWillEnter(){
      this._loader.startLoader('loader');
      localStorage.removeItem('courseId')
      this._api.courseDetailsList(this.courseId, this.userId).subscribe((res: any) => {
        console.log(res);
        if (res.status == '1') {
          localStorage.setItem('courseId', this.courseId)
          this.course_details = res.course_details; // get course details
          this.testimonials = res.testimonials; // get all testimonials;
          this.testimonials.forEach((el: any) => {
            el.rating = Array(parseInt(el.rating)).fill(0).map((x, i) => i);
          });
          this.alltopics = res.topics; // get all topics of course
          this.relatedCourse = res.related_courses; // get related course
          this._loader.stopLoader('loader');

          //deactivte other topics
          for (let i = 0; i < this.alltopics.length; i++) {
            this.alltopics[0].isOpen = 1;
            if (this.alltopics[i].is_completed == 1) {
              this.alltopics[i].isOpen = 1;
              this.alltopics[i + 1].isOpen = 1;
              // } else {
              //   this.alltopics[i].isOpen = 0;
            }
            this.totalSlideLength += this.alltopics[i].slides.length

          }
          this.getForum();
          this.getCertificate();
          this._loader.stopLoader('loader');
          localStorage.setItem('rec_course', JSON.stringify(res.related_courses));

        }
      })
    });
    localStorage.removeItem('assignmentData')
    localStorage.removeItem('allTopic');
  }

  get f() {
    return this.forumForm.controls;
  }

  changePage(type: any) {
    this.page = type
  }


  /**
   * Method call to get forum list after add, delete ,edit or get list
   */
  getForum() {
    this._api.courseDetailsList(this.courseId, this.userId).subscribe((res: any) => {
      console.log(res);
      if (res.status == '1') {
        this.forums = res.forums;
      }
      // calculte days ago from forum's question
      this.forums.forEach((ele: any) => {
        ele.daysAgo = moment(ele.created_at).fromNow();
        ele.anwsers.forEach((ele2: any) => {
          ele2.daysAgo = moment(ele2.given_at).fromNow(); // calculte days ago from forum's answer
        })
      })
    })
  }

  /**
   * Method call to get certificate based on course of user
   */
  getCertificate() {
    this._api.getCeritificateOnCourse(this.userId, this.courseId).subscribe(res => {
      console.log(res);
      if (res.status == 1) {
        this.certificates = res.certificates
      }
    })

  }


  /**
   * Method call to go to slide page
   * @param array index
  */
  goToTopicSlide(i: number) {
    localStorage.removeItem('completed')
    // if (this.alltopics[i].isOpen == 1) {
    // localStorage.setItem('topics', JSON.stringify(this.alltopics[i]))
    // this.router.navigateByUrl('/user/topicslide')

    // } else {
    //   this.Toast.fire({
    //     icon: 'warning',
    //     title: 'You have to complete previous topic.'
    //   })
    // }

    if (this.course_details.is_prime == '1') {
      if (this.userDetails.is_prime == '1') {
        if (this.alltopics[i].assignment == '') {
          this.goToTopic(i)
        }
        // this.goToTopic(i)
      } else {
        this.router.navigateByUrl('/user/pricing')
      }
    } else {
      if (this.alltopics[i].assignment == '') {
        this.goToTopic(i)
      }

    }
  }

  goToTopic(i: any) {
    localStorage.setItem('allTopic', JSON.stringify(this.alltopics));
    if (i == 0) {
      localStorage.setItem('topics', JSON.stringify(this.alltopics[i]))
      // this.router.navigateByUrl('/user/topicslide', { skipLocationChange: true })
      this.router.navigateByUrl('/user/topicslide')
    } else if (this.alltopics[i - 1].is_completed == 1) {
      this.alltopics[i].isOpen = 1;
      localStorage.setItem('topics', JSON.stringify(this.alltopics[i]))
      this.router.navigateByUrl('/user/topicslide')
      // localStorage.setItem('completed', 'true')
    } else {
      this.Toast.fire({
        icon: 'warning',
        title: 'You have to complete previous topic.'
      })
    }
  }

  /**
   * Method call to add forum by user
   */
  addForum() {
    this.submitted = true;
    if (this.forumForm.valid) {
      this._loader.startLoader('loader');
      let forumData = new FormData();
      forumData.append('created_by', this.userId);
      forumData.append('course_id', this.courseId);
      forumData.append('topic', this.forumForm.value.forumContent);
      // if (this.forumContent.length<30) {
      //   this.forumCheck = true;
      // } else {
      //   this.forumCheck = false;
      this._api.addForum(forumData).subscribe((res: any) => {
        console.log(res);
        this._loader.stopLoader('loader')
        if (res.status == 1) {
          this.Toast.fire({
            icon: 'success',
            title: res.message
          })
          this.forumForm.reset();
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong. Please try again.'
          })

        }
      })
    }
  }


  /**
   * Method call to to add topic answer
   */
  submitAns(topicId: any) {
    if (this.topicAnswer == '') {
      this.Toast.fire({
        icon: 'warning',
        title: 'Please add your answer'
      })
    } else {
      let topicansData = new FormData();
      topicansData.append('given_by', this.userId);
      topicansData.append('topic_id', topicId);
      topicansData.append('answer', this.topicAnswer);
      this._api.addTopicAnswer(topicansData).subscribe((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.topicAnswer = '';
          this.Toast.fire({
            icon: 'success',
            title: res.message
          })
          this.getForum();
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong. Please try again.'
          })

        }
      })
    }

  }

  /**
   * Method call to to delete topic answer of given topic user
   */
  deleteTopic(answerId: number) {
    this._api.deleteTopicAnswer(answerId).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.Toast.fire({
            icon: 'success',
            title: res.message
          })
          this.getForum();
        }
      })
  }

  /**
   * Method call to edit topic answer by given by user
   */
  async editAnswer(id: number, ans: string) {
    this.answer = ans,
      this.formAnsId = id
  }

  saveEditReply() {
    if (this.answer == '') {
      this.Toast.fire({
        icon: 'warning',
        title: 'Please submit your forum answer'
      })
    } else {
      this._loader.startLoader('loader')
      const formData = new FormData();
      formData.append("id", this.formAnsId);
      formData.append("answer", this.answer);

      this._api.editTopicAns(formData).subscribe((data: any) => {
        if (data.status == 1) {
          this.Toast.fire({
            icon: 'success',
            title: 'Your comment has been updated successfully.'
          })
          this._loader.stopLoader('loader')
          this.getForum();
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong. Please try again.'
          })
          this._loader.stopLoader('loader')
        }
      }, (er: any) => {
        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong. Please try again.'
        })
        this._loader.stopLoader('loader')
      })
    }
  }

  /**
   * Method call to go to page for upload assignments
   */
  goToAssignments(topic: any, CourseId: number, topicId: number) {
    console.log('test');

    let assignmentSave = {
      topic,
      course: CourseId,
      topicId
    }

    localStorage.setItem('assignmentData', JSON.stringify(assignmentSave))
    this.router.navigateByUrl('/user/course_assignments')
  }

  /**
   * Method call to go to previous page
   */
  goToBack() {
    this.location.back();
  }





  //   public uploadedFile: any ='';
  // public fileFormatError = '';
  // public selectedFile : any = '';
  // public hasFile : boolean = false;
  // public productImgUrl : any = new Array();
  // onSelectFile(event: any) {
  // this.fileFormatError = '';this.hasFile = false;
  // this.selectedFile = event.target.files[0];
  // if(this.selectedFile != undefined && this.selectedFile != null){
  //     let validFormat = ['png','jpeg','jpg'];
  //     let fileName = this.selectedFile.name.split('.').pop();
  //     let data = validFormat.find(ob => ob === fileName);
  //     if(data != null || data != undefined){
  //     this._loader.startLoader('loader');
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //         this.uploadedFile = event.target?.result;
  //         this.hasFile = true;
  //         this.storeFile(this.selectedFile);
  //     }
  //     return true;
  //     }
  //     this.fileFormatError = 'This File Format is not accepted';
  //     this._loader.stopLoader('loader');
  // }
  // return false;
  // }
  // storeFile(file:any) {
  // const mainForm = new FormData();
  // mainForm.append('file',file);
  // console.log(file);
  // this._api.storeFile(mainForm).subscribe(
  //     res => {
  //     console.log(res);
  //     this.productImgUrl.push(res.file_link);
  //     console.log(this.productImgUrl);
  //     this._loader.stopLoader('loader');
  //     }
  // )
  // }
  goToCourseDetialsPage(id: number) {
    this.router.navigateByUrl('/user/coursedetails/' + id)
  }

}
