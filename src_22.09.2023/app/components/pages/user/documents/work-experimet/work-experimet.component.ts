import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-work-experimet',
  templateUrl: './work-experimet.component.html',
  styleUrls: ['./work-experimet.component.css']
})
export class WorkExperimetComponent implements OnInit {
  documents: any = {};
  file: any;
  uploadBtn = false;
  userId: any;
  edit: boolean = false;
  mindate: any
  maxDate: any;
  jodData: boolean = false;
  minDateforRelease: any;
  relaseDate = true;
  release: boolean = true;
  releaseDateCtrl: boolean = false;
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
  constructor(private _api: ApiServiceService, private _loader: NgxUiLoaderService, private location: Location) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userData')!).id;
    this.mindate = moment('2000-01-01').format('YYYY-MM-DD');
    this.maxDate = moment().format('YYYY-MM-DD');

    let getData = JSON.parse(localStorage.getItem('work')!)
    console.log(getData)
    if (getData !== '') {
      this.edit = true;
      this.documents.organisation = getData.organization
      this.documents.designation = getData.designation
      this.documents.jod = getData.start_date

      getData.is_current == 1 ? this.relaseDate = false : this.relaseDate = true
      this.documents.isChecked = getData.is_current == 0 ? false : true
      getData.is_current == 0 ? this.release = true : this.release = false
      this.documents.releaseDate = getData.is_current == 0 ? getData.end_date : ''
      this.documents.doc = getData.file
      this.documents.id = getData.id
      console.log('this.documents', this.documents)
    } else this.edit = false
  }

  selectJoiningDate(value: any) {
    console.log(value)
    this.minDateforRelease = moment(value).format('YYYY-MM-DD');
    this.relaseDate = false
    this.jodData = false;
  }

  isCheck() {
    console.log(this.documents.isChecked)
    if (this.documents.isChecked) {
      this.release = false;
      this.relaseDate = false
    } else {
      this.release = true;
      this.relaseDate = false
    }

  }

  onFileSelected(event: any) {
    this.file = '';
    const file: File = event.target.files[0];
    if (file) {
      this.uploadBtn = true;
      this.file = file;
    }
  }
  // Method call to upload image
  upload() {
    this._loader.startLoader('loader');
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
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
    console.log(form.value)
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }

    if (form.value.jod == undefined) {
      this.jodData = true;
    }
    let ischeck = form.value.isChecked == undefined ? false : form.value.isChecked
    console.log('ischeck', ischeck)
    if (ischeck == false && (form.value.releaseDate == undefined || form.value.releaseDate == '')) {
      console.log('entry')
      this.releaseDateCtrl = true;
    } else this.releaseDateCtrl = false;

    if (this.documents.doc == undefined || this.documents.doc == '') {
      this.docValid = true;
    }

    if (form.valid && !this.jodData && !this.docValid && !this.releaseDateCtrl) {
      if (this.edit == false) {
        let ischeck: any = form.value.isChecked == undefined || form.value.isChecked == false ? 0 : 1
        let workForm = new FormData();
        workForm.append('user_id', this.userId);
        workForm.append('organization', form.value.organisation);
        workForm.append('designation', form.value.designation);
        workForm.append('start_date', form.value.jod);
        workForm.append('end_date', form.value.releaseDate);
        workForm.append('file', this.documents.doc);
        workForm.append('is_current', ischeck);

        this._api.saveWorkDocument(workForm).subscribe(res => {
          if (res.status == 1) {
            this.Toast.fire({
              icon: 'success',
              title: 'Successfully added'
            });
            this.location.back();
          } else {
            this.Toast.fire({
              icon: 'error',
              title: 'Something went wrong. Please try again.'
            });
          }
        })
      } else {
        let ischeck: any = form.value.isChecked == undefined || form.value.isChecked == false ? 0 : 1
        let workForm = new FormData();
        workForm.append('id', this.documents.id);
        workForm.append('organization', form.value.organisation);
        workForm.append('designation', form.value.designation);
        workForm.append('start_date', form.value.jod);
        workForm.append('end_date', form.value.releaseDate);
        workForm.append('file', this.documents.doc);
        workForm.append('is_current', ischeck);
        this._api.updateWorkDocument(workForm).subscribe(res => {
          if (res.status == 1) {
            this.Toast.fire({
              icon: 'success',
              title: 'Successfully submitted'
            });
            this.location.back();
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
