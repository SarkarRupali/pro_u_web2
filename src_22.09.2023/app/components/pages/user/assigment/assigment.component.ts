import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assigment',
  templateUrl: './assigment.component.html',
  styleUrls: ['./assigment.component.css']
})
export class AssigmentComponent implements OnInit {
  assignmentData:any={};
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
  
  constructor( private _api : ApiServiceService, private location : Location ) { }

  ngOnInit(): void {
    this.assignmentData = JSON.parse(localStorage.getItem('assignmentData')||'{}');
  }  
 

  onFileChange(event:any){    
      // Get a reference to the file that has just been added to the input
      const photo = event.target.files[0];
      console.log('photo',photo);
      let fileName = photo.name.split('.').pop();
      if (fileName=='pdf'|| fileName=='txt'|| fileName=='doc'||fileName=='docx'||fileName=='png'||fileName=='jpg'||fileName=='apk'||fileName=='ipa'||fileName=='jpeg'||fileName=='svg'||fileName=='gif'||fileName=='bmp') {
      
      // Create a form data object using the FormData API
      let formData = new FormData();
      // Add the file that was just added to the form data
      formData.append('user_id', JSON.parse(localStorage.getItem('userData')||'{}').id);
      formData.append('course_id', this.assignmentData.course);
      formData.append('topic_id', this.assignmentData.topicId);
      formData.append('file', photo);
      // POST formData to server using HttpClient
     this.submitAssignment(formData)
       
    } else {
      this.Toast.fire({
        icon: 'warning',
        title: 'This File Format is not accepted'
      })
    }
  }

  /**
   * Method call to submit assignment
   */
  submitAssignment(formData: any){
    this._api.saveAssignment(formData).subscribe((res:any)=>{
      console.log(res);
      if (res.status==1) {
        this.Toast.fire({
              icon: 'success',
              title: 'Your assignment is uploaded successfully.'
            })
        
        this.location.back();
      } else {
        this.Toast.fire({
              icon: 'warning',
              title: 'Something went wrong. Please try again.'
            })
        
      }
      
    })
  }

}
