import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ApiServiceService } from 'src/app/services/api-service.service';
import  Swal  from "sweetalert2";
@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forumList:any[] = [];
  userId:any=0;
  editForumData = '';
  forumId:any=0
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
  @ViewChild('myModalClose') modalClose!: ElementRef<HTMLElement>;
  constructor(private _helper : NgxUiLoaderService, private _api : ApiServiceService) { }

  ngOnInit():void {
    this.userId = JSON.parse(localStorage.getItem('userData')||'{}').id
    this.getForumdata()
  }

  /**
   * Method call to get all forums which post by user
  */
  getForumdata(){
    this._helper.startLoader('loader');
    this._api.getForumDataByUser(this.userId).subscribe((res:any)=>{
      console.log(res);
      if (res.status==1) {
        this.forumList = res.course_forums;
        this._helper.stopLoader('loader');
      } 
    })
  }

  /**
   * Method call to delete Forum
   */
  delete(forumId:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this forum?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result:any) => {
      if (result.isConfirmed) {
        this._api.deleteForum(forumId).subscribe((res:any)=>{
          if (res.status==1) {
            this._helper.stopLoader('loader');
            this.Toast.fire({
              icon: 'success',
              title: 'Deleted successfully'
            })
            this.getForumdata();
          } else {
            this._helper.stopLoader('loader');
            this.Toast.fire({
              icon: 'error',
              title: 'Something went wrong. Please try again'
            })
          }
        })
      }
    })
  }
  /**
   * Mehod call to edit forum
   */
  async editForum(item:any){
    console.log(item);
    this.forumId = item.id
    this.editForumData= item.topic
  }

  saveData(){
    if (this.editForumData=='') {
      this.Toast.fire({
        icon:'warning',
        title: 'Please enter data'
      })
    } else {
      this._helper.startLoader('loader');
      const formData = new FormData();
      formData.append("id",this.forumId);
      formData.append("topic",this.editForumData);
    
      this._api.editForum(formData).subscribe((data:any)=>{
        console.log('team',data);
        if (data.status==1) {
          this._helper.stopLoader('loader');
          this.modalClose.nativeElement.click();
          this.getForumdata()
          } else {
             this.modalClose.nativeElement.click();
          }
      },(er:any)=>{
        this.Toast.fire({
          icon:'warning',
          title: "Something went wrong. Please try again."
        })
        this._helper.stopLoader('loader');
      })
    }
  }

}
