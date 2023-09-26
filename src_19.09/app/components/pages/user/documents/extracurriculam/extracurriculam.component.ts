import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-extracurriculam',
  templateUrl: './extracurriculam.component.html',
  styleUrls: ['./extracurriculam.component.css']
})
export class ExtracurriculamComponent implements OnInit {
  documents: any = {};
  documentFile: any = '';
  uploadButn = false;
  userId: any;
  edit: boolean = false;
  titleValid: boolean = false
  descriptionValid: boolean = false;
  docValid: boolean = false;
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

  ngOnInit() {
    let userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userId = userDetails.id;

    let getData = JSON.parse(localStorage.getItem('extra')!)
    console.log(getData)
    if (getData !== '') {
      this.edit = true;
      this.documents.title = getData.title
      this.documents.description = getData.description
      this.documents.doc = getData.file
      this.documents.id = getData.id
    } else this.edit = false
  }

  addTitle(event: any) {
    if (event == '') {
      this.titleValid = true;
    } else {
      this.titleValid = false;
    }
  }

  addDescription(event: any) {
    if (event == '') {
      this.descriptionValid = true;
    } else {
      this.descriptionValid = false;
    }
  }

  // Method call to upload certificate
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadButn = true;
      this.documentFile = file;

    }
  }
  // Method call to upload image
  upload() {
    this._loader.startLoader('loader');
    const formData = new FormData();
    formData.append('file', this.documentFile, this.documentFile.name);
    this._api.profileImage(formData).subscribe(res => {
      console.log('image', res)
      if (res.status == '1') {
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully uploaded document'
        });
        this.documents.doc = res.image;
        this.docValid = false;
      }
      else {
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong. Please try again.'
        });
      }
    })
  }

  // Method call to upload documents
  submitDocuments(form: NgForm) {
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }
    if (this.documents.doc == undefined || this.documents.doc == '') {
      this.docValid = true;
    }

    if (form.valid && !this.docValid) {
      if (this.edit == false) {
        let curriculamForm = new FormData();
        curriculamForm.append('user_id', this.userId);
        curriculamForm.append('title', form.value.title);
        curriculamForm.append('description', form.value.description);
        curriculamForm.append('file', this.documents.doc);

        this._api.uploadExtraDoc(curriculamForm).subscribe(res => {
          if (res.status == 1) {
            if (res.status == 1) {
              this.Toast.fire({
                icon: 'success',
                title: 'Successfully submitted'
              });
              this._location.back();
            } else {
              this.Toast.fire({
                icon: 'error',
                title: 'Something went wrong. Please try again.'
              });
            }
          } else {
            this.Toast.fire({
              icon: 'error',
              title: 'Something went wrong. Please try again.'
            });
          }
        })
      } else {
        let curriculamForm = new FormData();
        curriculamForm.append('id', this.documents.id);
        curriculamForm.append('title', form.value.title);
        curriculamForm.append('description', form.value.description);
        curriculamForm.append('file', this.documents.doc);
        this._api.updateCurriculamDocument(curriculamForm).subscribe(res => {
          if (res.status == 1) {
            if (res.status == 1) {
              this.Toast.fire({
                icon: 'success',
                title: 'Successfully added'
              });
              this._location.back();
            } else {
              this.Toast.fire({
                icon: 'error',
                title: 'Something went wrong. Please try again.'
              });
            }
          } else {
            this.Toast.fire({
              icon: 'error',
              title: 'Something went wrong. Please try again.'
            });
          }
        })
      }

    }
  }



}
