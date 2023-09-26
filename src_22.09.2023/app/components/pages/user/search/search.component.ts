import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTopic: any = '';
  userDetails: any = {};
  allSearchCourses: any = [];
  allSearchEvents: any = [];
  allsearchList: any = [];
  filterData: any = [];
  showList = false;
  negativeResult = false;
  commoncategories: any = [];
  commonCountry: any = [];
  commonSearch: any = [];
  public baseImage = environment.imageUrl
  constructor(private _api: ApiServiceService, private _router: Router) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('userData') || '{}')) {
      this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    }

    this._api.gethomePageData().subscribe(res => {
      if (res.status == 1) {
        res.categories.forEach((el: any) => {
          el.courses.forEach((el2: any) => {
            if (!this.allsearchList.includes(el2.name)) this.allsearchList.push(el2.name.trim('_'))
            if (!this.allsearchList.includes(el2.author_name)) this.allsearchList.push(el2.author_name.trim('_'))
          })
        })

        res.events.forEach((event: any) => {
          if (!this.allsearchList.includes(event.topic)) this.allsearchList.push(event.topic.trim('_'))
          // this.allsearchList.push(event.topic)
        })
      }
    })

    this._api.getsearchData().subscribe(res => {
      console.log(res)
      if (res.status == 1) {
        this.commoncategories = res.categories;
        this.commonCountry = res.countries;
        this.commonSearch = res.prompts;
      }
    })

  }

  search() {
    if (this.searchTopic != '') {
      let data = new FormData();
      data.append('keyword', this.searchTopic)
      this._api.searchData(data).subscribe(res => {
        if (res.status == "1") {
          this.allSearchCourses = res.courses
          this.allSearchEvents = res.events
          this.allSearchEvents.forEach((el: any) => {
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
          if (res.courses.length == 0 && res.events.length == 0) this.negativeResult = true;
        }
      })
    }
  }


  /**
   * Method is calling to navigate course details page
 */
  goToCourseDetialsPage(id: any, cousePrime: any) {
    // if (cousePrime == '1') {
    //   if (this.userDetails.is_prime == '1') {
    //     this._router.navigateByUrl('/user/coursedetails/' + id)
    //   } else {
    //     this._router.navigateByUrl('/user/pricing')
    //   }
    // } else {
    this._router.navigateByUrl('/user/coursedetails/' + id)
    // }
  }

  // Method call to make auto sugesstion list
  seachSuggesion(ev: any) {
    if (ev.length > 2) {
      this.showList = true;
      this.filterData = this.allsearchList.filter((search: any) => {
        return search.toLowerCase().indexOf(ev.toLowerCase()) > -1;
      });
    } else {
      this.showList = false;
      this.allSearchEvents = [];
      this.allSearchCourses = [];
      this.negativeResult = false;
    }
  }

  SearchItem(el: any) {
    this.searchTopic = el;
    this.showList = false;
    this.search();
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

  goToCountry(countryId: any) {
    this._router.navigateByUrl('/user/country/' + countryId)
  }

  goToCoursePage(courseId: any) {
    localStorage.setItem('coursename', courseId)
    this._router.navigateByUrl("/user/internships")
  }
}
