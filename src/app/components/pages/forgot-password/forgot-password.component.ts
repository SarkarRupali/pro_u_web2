import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
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
  public errorMessage: any = '';
  public email: any = ''
  public submitted = false;
  public emailvalid = false;

  constructor(private apiService: ApiServiceService, private _loader: NgxUiLoaderService, private router: Router) { }


  ngOnInit(): void {

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
   * Method call to register a user 
  */
  forgotForm(form: NgForm) {
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
      this.apiService.forgetPassword(formData).subscribe((res: any) => {
        this._loader.stopLoader('loader');
        if (res.status == "1") {
          this.Toast.fire({
            icon: 'success',
            title: 'Password sent to your registered email. Please check your email.'
          });
          this.router.navigate(['/login']);
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
        this.Toast.fire({
          icon: 'error',
          title: 'Something is wrong. Please try again.'
        })
      });
    }
  }
}
