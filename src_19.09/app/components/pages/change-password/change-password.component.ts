import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userData: any;
  email = '';
  passwordType = 'password';
  showPsw = false;
  passwordnewType = 'password';
  showNewPsw = false;
  password: any = '';
  newpassword: any = '';
  submitted = false;
  passwordValid = false;

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
  constructor(private apiService: ApiServiceService, private _loader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.email = this.userData.email
  }

  /**
   * Method call to hide or show current password 
  */

  showcurrentPassword() {
    this.showPsw = !this.showPsw
    if (this.showPsw == false) {
      this.passwordType = 'password';
    } else {
      this.passwordType = 'text';
    }
  }

  /**
   * Method call to hide or show new password 
  */

  showNewPassword() {
    this.showNewPsw = !this.showNewPsw
    if (this.showNewPsw == false) {
      this.passwordnewType = 'password';
    } else {
      this.passwordnewType = 'text';
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


  changePasswordForm(form: NgForm) {
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }

    if (form.value.newpassword == '') {
      this.passwordValid = true;
    }

    this.submitted = true;
    if (form.valid) {
      this._loader.startLoader('loader');
      const formData = new FormData();
      formData.append("email", this.userData.email);
      formData.append("current_password", form.value.password);
      formData.append("new_password", form.value.newpassword);
      this.apiService.changePassword(formData).subscribe((res: any) => {
        this._loader.stopLoader('loader');
        if (res.status == "1") {
          this.Toast.fire({
            icon: 'success',
            title: res.message
          });
          this.apiService.logoutUser();
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