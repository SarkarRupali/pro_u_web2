import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { ApiServiceService } from 'src/app/services/api-service.service';
@Component({
  selector: 'app-events-resource',
  templateUrl: './events-resource.component.html',
  styleUrls: ['./events-resource.component.css']
})
export class EventsResourceComponent implements OnInit {
  public allEvents: any[] = [];
  public allresources: any = [];
  public userDetails: any = {};
  public today: any;
  public page:any='upCming'
  eventOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
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
        items: 2
      },
      1000: {
        items: 2
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

  constructor(private _api: ApiServiceService, private router: Router, private _loader: NgxUiLoaderService, private datepipe: DatePipe) {
    let date = new Date();
    this.today = this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this._loader.startLoader('loader');
    /**
     * Method call to get all event list
     */
    this._api.geteventList().subscribe((res: any) => {
      console.log(res);
      if (res.status == '1') {
        this._loader.stopLoader('loader');
        res.events.forEach((el: any) => {
          if (this.today <= el.event_date) {
            this.allEvents.push(el);
          }
        })
        // array sort by date
        this.allEvents.sort(function (a, b) {
          return new Date(a.event_date).getTime() - new Date(b.event_date).getTime();
        });
      }
      this.allEvents.forEach((el: any) => {
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
      //   var ampm = hours >= 12 ? 'pm' : 'am';
      // hours = hours % 12;
      // hours = hours ? hours : 12;
      // minutes = minutes < 10 ? '0'+minutes : minutes;
      // var strTime = hours + ':' + minutes + ' ' + ampm;
    })

    /**
     * Method call to get all resouces list
    */
    this._api.getResourcesList().subscribe((res: any) => {
      console.log(res);
      if (res.status == '1') {
        this.allresources = res.categories;
      }
    })
    // this.page = 'upCming'
  }

  /**
   * Method call to go resourse list page
   * @param i 
   */
  gotoResoursesPage(i: any) {
    localStorage.setItem('resourse', JSON.stringify(this.allresources[i]))
    this.router.navigateByUrl('/user/events/resources_list')
  }

  // Method call to sign up the event
  signUP(eventId: any) {
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}')
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

  changePage(type:any) {
    this.page = type;
  }

}
