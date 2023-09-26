import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  countries: any = [];
  course_durations: any = [];
  subjects: any = [];
  course_levels: any = [];
  selectedIndex: any = -1;
  selectedCountryIndex: any = -1;
  selected: any = -1;
  courseName: any = '';
  typesubject: any = '';
  typecountry: any = '';
  selectDuratin: any = '';
  filterResult: any = []

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

  constructor(private _api: ApiServiceService, private _loader: NgxUiLoaderService, private router: Router) { }

  ngOnInit(): void {
    this._api.setFilterData().subscribe(res => {
      console.log(res)
      if (res.status == 1) {
        this.countries = res.countries
        this.course_durations = res.course_durations
        this.subjects = res.subjects
        this.course_levels = res.course_levels
      }
    })
  }


  // Method call to choose couse for filter
  chooseCourse(courseName: any, i: any) {
    this.selectedIndex = i;
    this.courseName = courseName
  }

  selectSubject(subjectName: any) {
    this.typesubject = subjectName;
  }

  selectcountry(country: any, index: any) {
    this.selectedCountryIndex = index
    this.typecountry = country;
  }

  chooseduration(durationName: any, j: any) {
    this.selected = j;
    this.selectDuratin = durationName
  }

  applyFilter() {
    if (this.typesubject == '' && this.selectDuratin == '' && this.typecountry == '' && this.courseName == '') {
      this.Toast.fire({
        icon: 'success',
        title: 'Please select any type'
      });
    } else {
      this._loader.startLoader('loader');
      const formData = new FormData();
      formData.append('subject', this.typesubject);
      formData.append('duration', this.selectDuratin);
      formData.append('country', this.typecountry);
      formData.append('level', this.courseName);

      this._api.resultFilter(formData).subscribe((res: any) => {
        console.log(res)
        if (res.status == 1) {
          this._loader.stopAllLoader('loader');
          // this.filterResult=res.courses
          localStorage.setItem('filterResult', JSON.stringify(res.courses))
          // this.navCtrl.navigateForward('/filter')
          this.router.navigate(['/user/filterData']);
        }
      })
    }
  }

  reset() {
    this.typesubject = ''
    this.selectDuratin = ''
    this.typecountry = ''
    this.courseName = '';
    this.selectedIndex = -1;
    this.selected = -1;
  }

}
