import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-modal',
  templateUrl: './doc-modal.component.html',
  styleUrls: ['./doc-modal.component.css']
})
export class DocModalComponent implements OnInit {
  userId: any
  uploadButn = false;
  documentFile: any;
  resumeCtrl: boolean = false;
  doc: any = '';
  page: any
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


  constructor(private _loader: NgxUiLoaderService, private _api: ApiServiceService, private _location: Location) { }

  ngOnInit(): void {
    let userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userId = userDetails.id;
    this.page = localStorage.getItem('type')
  }

  // Method call to upload certificate
  certificateUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadButn = true;
      this.documentFile = file;

    }
  }
  // Method call to upload image
  uploadFile() {
    this._loader.startLoader('loader');
    const formData = new FormData();
    formData.append('file', this.documentFile, this.documentFile.name);
    this._api.uploadDocument(formData).subscribe(res => {
      if (res.status == '1') {
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully uploaded document'
        });
        this.doc = res.file_name;
        this.resumeCtrl = false
      }
      else {
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong. Plesae try again.'
        });
      }
    })
  }

  submitDoc() {
    if (this.doc == '') {
      this.resumeCtrl = true;
    } else {
      this._loader.startLoader('loader');
      // visa
      if (this.page == 'visa') {
        const visaData = new FormData();
        visaData.append('id', this.userId);
        visaData.append('visa', this.doc);
        this._api.uploadVisaDoc(visaData).subscribe(res => {
          if (res.status == '1') {
            this._loader.stopLoader('loader');
            this.Toast.fire({
              icon: 'success',
              title: 'Successfully saved'
            });
            this._location.back()
          }
          else {
            this._loader.stopLoader('loader');
            this.Toast.fire({
              icon: 'error',
              title: 'Something went wrong. Plesae try again.'
            });
          }
        })
      }

      //passport
      if (this.page == 'passport') {
        const passportData = new FormData();
        passportData.append('id', this.userId);
        passportData.append('passport', this.doc);
        this._api.uploadPassportDoc(passportData).subscribe(res => {
          if (res.status == '1') {
            this._loader.stopLoader('loader');
            this.Toast.fire({
              icon: 'success',
              title: 'Successfully saved'
            });
            this._location.back()
          }
          else {
            this._loader.stopLoader('loader');
            this.Toast.fire({
              icon: 'error',
              title: 'Something went wrong. Plesae try again.'
            });
          }
        })
      }

      //finance
      if (this.page == 'finance') {
        const financeData = new FormData();
        financeData.append('id', this.userId);
        financeData.append('finance_document', this.doc);
        this._api.uploadFinaceDoc(financeData).subscribe(res => {
          if (res.status == '1') {
            this._loader.stopLoader('loader');
            this.Toast.fire({
              icon: 'success',
              title: 'Successfully saved'
            });
            this._location.back()
          }
          else {
            this._loader.stopLoader('loader');
            this.Toast.fire({
              icon: 'error',
              title: 'Something went wrong. Plesae try again.'
            });
          }
        })
      }
    }

    //health
    if (this.page == 'health') {
      const healthData = new FormData();
      healthData.append('id', this.userId);
      healthData.append('health_document', this.doc);
      this._api.uploadHealthDoc(healthData).subscribe(res => {
        if (res.status == '1') {
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'success',
            title: 'Successfully saved'
          });
          this._location.back()
        }
        else {
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong. Plesae try again.'
          });
        }
      })
    }

    //other
    if (this.page == 'other') {
      const otherData = new FormData();
      otherData.append('id', this.userId);
      otherData.append('other_document', this.doc);
      this._api.uploadOtherDoc(otherData).subscribe(res => {
        if (res.status == '1') {
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'success',
            title: 'Successfully saved'
          });
          this._location.back()
        }
        else {
          this._loader.stopLoader('loader');
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong. Plesae try again.'
          });
        }
      })
    }
  }

}