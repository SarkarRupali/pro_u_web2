import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { ApiServiceService } from '../../../services/api-service.service';
// import {
//   SearchCountryField,

//   CountryISO
// } from "ngx-intl-tel-input";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data = { name: '', email: '', mobile: '', password: '', gender: '', city: '', country: '', otherCountry: '', userReferralCode: '' };
  public submitted = false;
  public showPsw = false;
  public passwordType = 'password';
  public nameValid = false;
  public emailvalid = false;
  public phValid = false;
  public cityValid = false;
  public passwordValid = false;
  public universityList: any = [];
  public othersCountry = false;
  countryValid = false;
  countryData: any = [];
  searchCountry: any = [];
  public countryImage = '';
  public countryCode = '';
  public searchinput = ''
  readShow = false;
  other = false;
  higherEducationArr = ['No formal education', 'Primary education', 'Secondary education or high school', 'Vocational qualification', "Bachelor's degree", "Master's degree", "Doctorate or higher", "Other"];
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
  constructor(private apiService: ApiServiceService, private _loader: NgxUiLoaderService, private router: Router) { }

  ngOnInit(): void {
    this.getCountryCode()
    // this.getCollegeList()

    // if user register with google user then name and emailshould be passed from google account
    let googleData = JSON.parse(localStorage.getItem('googleData') || '{}')
    if (googleData.name != undefined) {
      this.readShow = true;
      this.data.name = googleData.name
      this.data.email = googleData.email
    } else this.readShow = false;

  }

  /**
   * Method call to hide or show password 
  */

  showPassword() {
    this.showPsw = !this.showPsw
    if (this.showPsw == false) {
      this.passwordType = 'password';
    } else {
      this.passwordType = 'text';
    }
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
  * Method call to check if password empty or not
 */
  rightPassword(event: any) {
    if (event == '') {
      this.passwordValid = true;
    } else {
      this.passwordValid = false;
    }
  }

  // Method call to get all country code
  getCountryCode() {
    this._loader.startLoader('loader');
    this.apiService.getcountry().subscribe(res => {
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
   * Method call to check if city empty or not
  */
  addCity(event: any) {
    if (event == '') {
      this.cityValid = true;
    } else {
      this.cityValid = false;
    }
  }


  /**
   * Method call to select country 
  */
  selectCountry(event: any) {

    if (event.target.value == 'Others') {
      this.othersCountry = true;
    } else {
      this.othersCountry = false;
    }
  }

  /**
   * Method call to check if country empty or not
  */
  addCountry(event: any) {
    if (event == '') {
      this.countryValid = true;
    } else {
      this.countryValid = false;
    }
  }

  /**
 * Method call to search a country 
*/
  search(event: any) {
    let searchData = event.target.value
    if (searchData.includes('+')) searchData = searchData.slice(1);
    if (searchData.length > 0) {
      this.countryData = this.searchCountry.filter((el: any) => {
        return (el.phonecode.indexOf(searchData) > -1 || el.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
      })
    } else this.countryData = this.searchCountry
  }

  // Method call to get all college List
  getCollegeList() {
    this._loader.startLoader('loader');
    this.apiService.getCollageName().subscribe(res => {
      if (res.status == '1') this.universityList = res.colleges;
      this._loader.stopLoader('loader');
    })
  }

  general() {
    //console.log(event)
    this.other = true;
  }

  /**
   * Method call to register a user 
  */
  registerForm(form: NgForm) {
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }
    if (form.value.name == '') {
      this.nameValid = true;
    }
    if (form.value.email == '') {
      this.emailvalid = true;
    }
    if (form.value.mobile == '') {
      this.phValid = true;
    }
    if (form.value.city == '') {
      this.cityValid = true;
    }

    if (form.value.password == '') {
      this.passwordValid = true;
    }

    if (form.value.country == 'Others' && form.value.otherCountry == '') {
      this.countryValid = true;
    }
    this.submitted = true;
    if (form.valid) {
      this._loader.startLoader('loader');
      form.value.country == 'Others' ? form.value.country = form.value.otherCountry : form.value.otherCountry;
      const mainData = form.value;
      const formData = new FormData();
      formData.append("name", mainData.name);
      formData.append("email", mainData.email);
      formData.append("password", mainData.password);
      formData.append("mobile", mainData.mobile);
      formData.append("gender", mainData.gender);
      formData.append("country", mainData.country);
      formData.append("city", mainData.city);
      formData.append("countryCode", this.countryCode);
      formData.append("referrer_code", mainData.userReferralCode);
      this.apiService.registerUser(formData).subscribe(
        (res: any) => {
          if (res?.status == 0) { // && res?.message == 'It seems you are already registered on ProU app, please login to continue'){
            this.Toast.fire({
              icon: 'error',
              title: res?.message
            });
            this._loader.stopLoader('loader')
          } else {
            this._loader.stopLoader('loader')
            this.Toast.fire({
              icon: 'success',
              title: res?.message
            });
            // this.router.navigateByUrl("/login");
            formData.append("email", mainData.email);
            formData.append("password", mainData.password);
            this.apiService.logInUser(formData).subscribe((res: any) => {
              this._loader.stopLoader('loader');
              if (res.status == "1") {
                localStorage.setItem('accessToken', '123456789');
                localStorage.setItem('userData', JSON.stringify(res['user']));
                this.router.navigate(['/user/dashboard']);
                // this.router.navigateByUrl("/login");
              } else {
                this.Toast.fire({
                  icon: 'error',
                  title: 'Something went wrong. Please try to login using your registered email and password.'
                });
              }
            })
          }
        }, (err: any) => {
          if (err?.status == 404 && err.error.success == false) {
            this.Toast.fire({
              icon: 'warning',
              title: 'The email already used. Please enter valid email-id'
            });
            this._loader.stopLoader('loader')
          } else {
            this.Toast.fire({
              icon: 'error',
              title: err?.message
            });
            this._loader.stopLoader('loader');
          }
        })
    }
  }




}
