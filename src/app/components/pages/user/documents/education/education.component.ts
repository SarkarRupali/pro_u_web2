import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  edu: any = {};
  file: any;
  uploadButn = false;
  userId: any;
  edit: boolean = false;
  selectScore: boolean = false;
  nameValid: boolean = false;
  fieldValid: boolean = false;
  docValid: boolean = false;
  uploadBtn = false;

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

  constructor(private _api: ApiServiceService, private _loader: NgxUiLoaderService, private location: Location) {
    let userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userId = userDetails.id;
  }

  ngOnInit(): void {
    let getData = JSON.parse(localStorage.getItem('edu')!)
    console.log(getData)
    if (getData !== null) {
      this.edit = true;
      this.edu.name = getData.institution
      this.edu.degree = getData.degree
      this.edu.fieldOfStudy = getData.field_of_study
      this.edu.gradding = getData.grade
      getData.grade == "Letter Grade" ? this.selectScore = true : this.selectScore = false
      getData.grade == "Letter Grade" ? this.edu.letter = getData.score : this.edu.score = getData.score
      this.edu.country = getData.country
      this.edu.doc = getData.file
      this.edu.id = getData.id
    } else this.edit = false
  }

  gradeChange(value: any) {
    console.log('value', value)
    if (value == 'Letter Grade') {
      this.selectScore = true
      // this.documents.score = ''
    } else {
      this.selectScore = false
      // this.documents.letter = ''
    }
  }

  addInstitution(event: any) {
    if (event == '') {
      this.nameValid = true;
    } else {
      this.nameValid = false;
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
        this.edu.doc = res.image;
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
    console.log('enter', this.edu)
    console.log('doc', this.edu.doc)
    console.log('form.value', form.value)
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }
    //check name field blank or not
    if (form.value.name == undefined) {
      this.nameValid = true;
    }
    //check fieldofdtudy field blank or not
    if (form.value.fieldOfStudy == undefined) {
      this.fieldValid = true;
    }

    //check document has uploaded or not
    if (this.edu.doc == undefined) {
      this.docValid = true;
    }

    if (form.valid && this.edu.doc !== undefined) {
      if (this.edit == false) {
        let score = form.value.score == '' ? form.value.letter : form.value.score
        let instructorForm = new FormData();
        instructorForm.append('user_id', this.userId);
        instructorForm.append('country', form.value.country);
        instructorForm.append('institution', form.value.name);
        instructorForm.append('degree', form.value.degree);
        instructorForm.append('field_of_study', form.value.fieldOfStudy);
        instructorForm.append('score', score);
        instructorForm.append('grade', form.value.gradding);
        instructorForm.append('file', this.edu.doc);

        this._api.saveDocument(instructorForm).subscribe(res => {
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
        let score = (form.value.score == '' || form.value.score == undefined) ? form.value.letter : form.value.score
        let instructorForm = new FormData();
        instructorForm.append('id', this.edu.id);
        instructorForm.append('country', form.value.country);
        instructorForm.append('institution', form.value.name);
        instructorForm.append('degree', form.value.degree);
        instructorForm.append('field_of_study', form.value.fieldOfStudy);
        instructorForm.append('score', score);
        instructorForm.append('grade', form.value.gradding);
        instructorForm.append('file', this.edu.doc);

        this._api.updateDocument(instructorForm).subscribe(res => {
          if (res.status == 1) {
            this.Toast.fire({
              icon: 'success',
              title: 'Successfully edited'
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
