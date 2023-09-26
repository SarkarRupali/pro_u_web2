import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-become-executive',
  templateUrl: './become-executive.component.html',
  styleUrls: ['./become-executive.component.css']
})
export class BecomeExecutiveComponent implements OnInit {
  public countryData: any = [];
  public searchCountry: any = [];
  public fname = '';
  public lname = '';
  public email = '';
  public mobile = '';
  public city = '';
  public age = '';
  public country = '';
  public fnameValid = false;
  public lnameValid = false;
  public cityValid = false;
  public countryValid = false;
  public emailvalid = false;
  public phValid = false;
  public ageValid = false;
  public ageCheck = false;
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
  addFirstName(event: any) {
    console.log(event);

    if (event == '') {
      this.fnameValid = true;
    } else {
      this.fnameValid = false;
    }
  }

  /**
   * Method call to check if firstname input empty or not
  */
  addLastName(event: any) {
    if (event == '') {
      this.lnameValid = true;
    } else {
      this.lnameValid = false;
    }
  }

  /**
   * Method call to check if email input empty or not
  */
  addEmail(event: any) {
    if (event == '') {
      this.emailvalid = true;
    } else {
      this.emailvalid = false;
    }
  }

  /**
   * Method call to check if mobile number empty or not
  */
  addph(event: any) {
    if (event == '') {
      this.phValid = true;
    } else {
      this.phValid = false;
    }
  }

  /**
   * Method call to check if mobile number empty or not
  */
  addCity(event: any) {
    if (event == '') {
      this.cityValid = true;
    } else {
      this.cityValid = false;
    }
  }

  /**
   * Method call to check if mobile number empty or not
  */
  addCountry(event: any) {
    if (event == '') {
      this.countryValid = true;
    } else {
      this.countryValid = false;
    }
  }

  /**
   * Method call to check if age empty or not
  */
  addAge(event: any) {
    if (event == '') {
      this.ageValid = true;
      this.ageCheck = false;
    } else if (event < 18) {
      this.ageCheck = true;
      this.ageValid = false;
    } else {
      this.ageValid = false;
      this.ageCheck = false;
    }
  }


  /**
   * Method call to add data as a executive
  */
  submitExecutive(form: NgForm) {
    console.log(form.value);
    this._loader.startLoader('loader')
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }
    //check first name field blank or not
    if (form.value.fname == '') {
      this.fnameValid = true;
    }
    //check last name field blank or not
    if (form.value.lname == '') {
      this.lnameValid = true;
    }

    //check email field blank or not
    if (form.value.email == '') {
      this.emailvalid = true;
    }

    //check mobile field blank or not
    if (form.value.mobile == '') {
      this.phValid = true;
    }

    //check city field blank or not
    if (form.value.city == '') {
      this.cityValid = true;
    }
    //check country field blank or not
    if (form.value.country == '') {
      this.countryValid = true;
    }
    //check age field blank or not
    if (form.value.age == '') {
      this.ageValid = true;
    }
    if (form.value.age < 18) {
      this.ageCheck = true;
    }
    if (form.valid && !this.ageCheck) {
      let executiveForm = new FormData();
      executiveForm.append('fname', form.value.fname);
      executiveForm.append('lname', form.value.lname);
      executiveForm.append('email', form.value.email);
      executiveForm.append('phone', form.value.mobile);
      executiveForm.append('country', form.value.country);
      executiveForm.append('city', form.value.city);
      executiveForm.append('age', form.value.age);

      this._api.submitExecutiveForm(executiveForm).subscribe((res: any) => {
        console.log(res);
        if (res.status == 1) {
          this._loader.stopLoader('loader')
          this.Toast.fire({
            icon: 'success',
            title: 'Successfully submitted.'
          })
          this.location.back();
        } else {
          this._loader.stopLoader('loader')
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong. Please try again.'
          })
        }
      })
    } else {
      this._loader.stopLoader('loader');
    }

  }

}
