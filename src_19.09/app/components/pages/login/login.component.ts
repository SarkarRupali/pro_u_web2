import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";

import { ApiServiceService } from '../../../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  public errorMessage: any = ''
  data = { email: '', password: '' };
  public submitted = false;
  public showPsw = false;
  public emailvalid = false;
  public passwordType = 'password';
  constructor(private apiService: ApiServiceService, private _loader: NgxUiLoaderService, private router: Router) { }


  ngOnInit(): void {
    gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '162910875765-tbjcun2lbnh10vhdhf3p366ukcpdgs0c.apps.googleusercontent.com',
        scope: 'profile',
        plugin_name: "proU"
      })
    })

    localStorage.removeItem('googleData')
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
   * Method call to register a user 
  */
  loginForm(form: NgForm) {
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }
    if (form.value.email == '') {
      this.emailvalid = true;
    }
    this.submitted = true;
    if (form.valid) {
      this._loader.startLoader('loader');
      const formData = new FormData();
      formData.append("email", form.value.email);
      formData.append("password", form.value.password);
      this.apiService.logInUser(formData).subscribe((res: any) => {
        this._loader.stopLoader('loader');
        if (res.status == "1") {
          localStorage.setItem('accessToken', '123456789');
          localStorage.setItem('userData', JSON.stringify(res['user']));
          this.router.navigate(['/user/dashboard']);
          //this.navCtrl.navigateForward('/first-team');
        } else if (res.status == 0) {
          this.Toast.fire({
            icon: 'error',
            title: res.message
          })
          // this.helper.presentToast('Invalid login credentials! Please enter correct credentials.')
        }
      }, (err: any) => {
        console.log(err);
        this._loader.stopLoader('loader');
        if (err.status == 422) {
          this.Toast.fire({
            icon: 'warning',
            title: 'Phone number and password does not match. Please enter valid Phone number and password.'
          })

        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'Something is wrong. Please try again.'
          })

        }
      });
    }
  }

  // Method call to login with gmail account
  loginWithGoogle(): void {
    let that = this;
    var auth2 = gapi.auth2.getAuthInstance();
    gapi.load('auth2', function () {
      auth2.signIn().then(function (googleUser) {
        console.log('user signed in')
        var profile = googleUser.getBasicProfile();
        console.log('user  in', profile)
        console.log('Name: ' + profile.getName());
        const googleData = new FormData();
        googleData.append('name', profile.getName())
        googleData.append('email', profile.getEmail())
        that.apiService.socialLogin(googleData).subscribe((res: any) => {
          console.log(res);
          if (res.status == 0) {
            let data = {
              name: profile.getName(),
              email: profile.getEmail()
            }
            localStorage.setItem('googleData', JSON.stringify(data));
            that.router.navigate(['/register']);
          } else {
            localStorage.setItem('accessToken', '123456789');
            localStorage.setItem('userData', JSON.stringify(res['user']));
            that.router.navigate(['/user/dashboard']);
          }
        }, err => {
          console.log(err);
          that.Toast.fire({
            icon: 'warning',
            title: 'Something went wrong. Please try again.'
          })
        })
        console.log('Email: ' + profile.getEmail());

      }, function (error) {
        console.log('user failed to sign in')
      })
    })

  }
}



