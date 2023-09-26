import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
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
  constructor(private apiService: ApiServiceService, private router: Router) { }

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


// https://app.proueducation.com