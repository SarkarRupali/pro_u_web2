import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from "sweetalert2";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-become-instructor',
  templateUrl: './become-instructor.component.html',
  styleUrls: ['./become-instructor.component.css']
})
export class BecomeInstructorComponent implements OnInit {
  public countryData: any = [];
  public searchCountry: any = [];
  public name = '';
  public email = '';
  public mobile = '';
  public designation = '';
  public linkdinProfile = '';
  public topic_choice = '';
  public source = '';
  public nameValid = false;
  public emailvalid = false;
  public phValid = false;
  public designatinValid = false;
  public sourcefield = false;
  public topicValid = false;
  public linkValid = false;
  public countryImage = '';
  public countryCode = '';
  public searchinput = ''
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
  @ViewChild('countryModalClose') modalClose!: ElementRef<HTMLElement>;
  constructor(private _api: ApiServiceService, private location: Location, private _loader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.getCountryCode()
  }

  // Method call to get all country code
  getCountryCode() {
    this._loader.startLoader('loader');
    this._api.getcountry().subscribe(res => {
      console.log('country', res)
      if (res.status == '1') this.countryData = res.countries;
      this.countryData.unshift({
        'image': 'https://flagpedia.net/data/flags/normal/in.png',
        'phonecode': '91',
        'name': 'India'
      })
      this.countryCode = '+' + this.countryData[0].phonecode
      this.countryImage = this.countryData[0].image;
      this.searchCountry = this.countryData
      this._loader.stopLoader('loader');
    })

  }
  // Method call to choose a country and close a modal
  chooseCountry(data: any, image: string) {
    this.countryCode = '+' + data;
    this.countryImage = image
    this.countryData = this.searchCountry;
    this.searchinput = '';
    this.modalClose.nativeElement.click();
  }


  /**
 * Method call to search a country 
*/
  search(event: any) {
    console.log(event.target.value)
    let searchData = event.target.value
    if (searchData.includes('+')) searchData = searchData.slice(1);
    if (searchData.length > 0) {
      this.countryData = this.searchCountry.filter((el: any) => {
        // console.log(this.countryData)
        return (el.phonecode.indexOf(searchData) > -1 || el.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
      })
    } else this.countryData = this.searchCountry
  }


  /**
   * Method call to check if firstname input empty or not
  */
  addName(event: any) {
    if (event == '') {
      this.nameValid = true;
    } else {
      this.nameValid = false;
    }
  }

  /**
   * Method call to check if email input empty or not
  */
  addEmail(event: string) {
    if (event == '') {
      this.emailvalid = true;
    } else {
      this.emailvalid = false;
    }
  }

  /**
   * Method call to check if mobile number empty or not
  */
  addph(event: string) {
    if (event == '') {
      this.phValid = true;
    } else {
      this.phValid = false;
    }
  }

  /**
   * Method call to check if mobile number empty or not
  */
  adddesignation(event: any) {
    if (event == '') {
      this.designatinValid = true;
    } else {
      this.designatinValid = false;
    }
  }

  /**
   * Method call to check if topic empty or not
  */
  addTopic(event: any) {
    if (event == '') {
      this.topicValid = true;
    } else {
      this.topicValid = false;
    }
  }

  /**
   * Method call to check if Linkdin Link empty or not
  */
  addLink(event: any) {
    if (event == '') {
      this.linkValid = true;
    } else {
      this.linkValid = false;
    }
  }

  /**
   * Method call after check radio button
  */
  selectSource(event: string) {
    console.log(event);
    this.sourcefield = false;
  }


  /**
   * Method call to add data as a instructor
  */
  submitInstructor(form: NgForm) {
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }
    //check name field blank or not
    if (form.value.name == '') {
      this.nameValid = true;
    }
    //check email field blank or not
    if (form.value.email == '') {
      this.emailvalid = true;
    }

    //check designation field blank or not
    if (form.value.designation == '') {
      this.designatinValid = true;
    }
    //check topic field blank or not
    if (form.value.topic_choice == '') {
      this.topicValid = true;
    }

    //check link field blank or not
    if (form.value.linkdinProfile == '') {
      this.linkValid = true;
    }

    //check source field blank or not
    if (form.value.source == '') {
      this.sourcefield = true;
    }

    //check ph field blank or not
    if (form.value.mobile == '') {
      this.phValid = true;
    }
    console.log(form.value);
    if (form.valid) {
      this._loader.startLoader('loader');
      let instructorForm = new FormData();
      instructorForm.append('name', form.value.name);
      instructorForm.append('email', form.value.email);
      instructorForm.append('phone', form.value.mobile);
      instructorForm.append('designation', form.value.designation);
      instructorForm.append('linkedin_profile_link', form.value.linkdinProfile);
      instructorForm.append('topic', form.value.topic_choice);
      instructorForm.append('got_reference_from', form.value.source);

      this._api.submitInstructorData(instructorForm).subscribe((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'success',
            title: 'Successfully submitted.'
          })
          this.location.back();
        } else {
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong. Please try again.'
          })

        }
      })

    }

  }

}

