import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ApiServiceService } from '../../../../services/api-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import Swiper from 'swiper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public coursesWithCategories: any = [];
  public userDetails: any;
  public testimonials: any = [];
  public events: any = [];
  public examList: any = [];
  public countryList: any = [];
  public university: any = [];
  public baseImage = environment.imageUrl
  arr = [1, 2, 3];
  public today: any


  @ViewChild('swiperContainer1') swiperContainer1!: ElementRef;
  @ViewChild('swiperContainer2') swiperContainer2!: ElementRef;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    // navSpeed: 600,
    // navText: ['&#8249', '&#8250;'],
    margin: 15,
    responsive: {
      0: {
        items: 1.1
      },
      400: {
        items: 2.1
      },
      760: {
        items: 3
      },

    },
    nav: false,
    autoHeight: false
  }

  customOptions5: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    // navSpeed: 600,
    // navText: ['&#8249', '&#8250;'],
    margin: 15,
    responsive: {
      0: {
        items: 1.1
      },
      400: {
        items: 1.1
      },
      760: {
        items: 2
      },

    },
    nav: false,
    autoHeight: false
  }

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 15,
    //autoWidth: true,
    responsive: {
      0: {
        items: 1.1
      },
      400: {
        items: 2.1
      },
      760: {
        items: 3
      },
    },
    nav: false,
    autoHeight: false,
    //autoWidth: false
  }

  customOptions4: OwlOptions = {
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

  constructor(private _api: ApiServiceService, private _loader: NgxUiLoaderService, private router: Router, private datepipe: DatePipe) {
    this._loader.startLoader('loader');
    // this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}')
    let date = new Date();
    this.today = this.datepipe.transform(date, 'yyyy-MM-dd');
    console.log('userDetails', this.userDetails);
    // api call to get categories, testimonials and events data
    this._api.gethomePageData().subscribe((res: any) => {
      if (res.status == '1') {
        this.coursesWithCategories = res.categories;
        this.testimonials = res.course_testimonials;
        res.events.forEach((el: any) => {
          if (this.today <= el.event_date) {
            this.events.push(el);
          }
        })
        // array sort by date
        this.events.sort(function (a: any, b: any) {
          return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
        });

        this.testimonials.forEach((el: any) => {
          el.rating = Array(parseInt(el.rating)).fill(0).map((x, i) => i);
        });

        this.events.forEach((el: any) => {
          let time = el.event_time.split(":")
          if (time[0] > 12) {
            let hours = time[0] % 12;
            if (hours == 0) {
              el.event_time = hours + ':' + time[1] + ' A.M.';
            } else {
              el.event_time = hours + ':' + time[1] + ' P.M.';
            }
          } else if (time[0] == 12) {
            el.event_time = el.event_time + ' P.M.'
          } else {
            el.event_time = el.event_time + ' A.M.'
          }
        })

        this._loader.stopLoader('loader')
      }
    })

    this._api.prfileUser(JSON.parse(localStorage.getItem('userData') || '{}').id).subscribe((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.userDetails = res.user;
        localStorage.setItem('userData', JSON.stringify(res.user))
      }
    })

    // api call to get country list
    this._api.getCountryList().subscribe(res => {
      if (res.status == 1) {
        this.countryList = res.countries
      }
    })

    this._api.getuniversityList().subscribe(res => {
      if (res.status == 1) {
        this.university = res.universities
      }
    })

    this._api.getTestExamList().subscribe((res: any) => {
      console.log(res)
      this.examList = res.exams
    })
  }


  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    const swiper1 = new Swiper(this.swiperContainer1.nativeElement, {
    //const examslider = new Swiper('.exam-slider', {
      // Swiper configuration options
      slidesPerView: 1, // Adjust as needed
      spaceBetween: 15, // Adjust as needed
      loop: true,
      navigation: false,
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      breakpoints: {
        320: {
          slidesPerView: 1.6,
        },
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    const swiper2 = new Swiper(this.swiperContainer2.nativeElement, {
    //var eventslider = new Swiper('.workshop_slider', {
      // Swiper configuration options
      slidesPerView: 1, // Adjust as needed
      spaceBetween: 15, // Adjust as needed
      loop: true,
      navigation: false,
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      breakpoints: {
        320: {
          slidesPerView: 1.1,
        },
        640: {
          slidesPerView: 2.1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  search() {
    console.log('jjksa')
    this.router.navigateByUrl('/user/search')
  }

  /**
   * Method is calling to navigate course details page
 */
  goToCourseDetialsPage(id: number, cousePrime: any) {
    // if (cousePrime == '1') {
    //   if (this.userDetails.is_prime == '1') {
    //     this.router.navigateByUrl('/user/coursedetails/' + id)
    //   } else {
    //     this.router.navigateByUrl('/user/pricing')
    //   }
    // } else {
    this.router.navigateByUrl('/user/coursedetails/' + id)
    // }
  }

  /**
   * Method call to copy reffercode
   * @param val 
   */
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.Toast.fire({
      icon: 'success',
      title: 'Successfully copied.'
    })
  }

  // Method call to sign up the event
  signUP(eventId: any) {
    const formData = new FormData();
    formData.append("event_id", eventId);
    formData.append("user_id", this.userDetails.id);

    this._api.signUpEvent(formData).subscribe(res => {
      if (res.status == "1") this.Toast.fire({
        icon: 'success',
        title: 'Successfully submitted.'
      })
    })
  }

  goToCoursePage(courseId: any) {
    console.log('courseId', courseId)
    localStorage.setItem('coursename', courseId)
    this.router.navigateByUrl("/user/internships")
  }

  goToCountryDetails(countryId: any) {
    console.log('countryId', countryId)
    this.router.navigateByUrl("/user/country/" + countryId)
  }

  gotoTestPrepDetials(exam: any) {
    console.log('exam', exam)
    localStorage.setItem('detail', JSON.stringify(exam));
    this.router.navigateByUrl('/user/testPrep')
  }

  sharefacebookUrl(referralCode: any) {
    console.log('test facebook')
    // let searchParams = new URLSearchParams();
    let msg = `Refer or Invite others using link: https://app.proueducation.com . Referral Code :${referralCode}`
    // searchParams.set('u', msg);

    window.open('https://www.facebook.com/sharer/sharer.php?' + msg);
    return false
  }



}
