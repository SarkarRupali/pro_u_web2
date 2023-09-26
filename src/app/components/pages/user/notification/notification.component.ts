import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  userId:any=0;
  notificationList:any[]=[]
  constructor(private _api : ApiServiceService, private _loader : NgxUiLoaderService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData')||'{}').id;
    this.getAllNotification();
  }

  /**
   * Method call to get all notification by user
   * @param user id
   */
  getAllNotification(){
    this._loader.startLoader('loader');
    this._api.notificationList(this.userId).subscribe(
      (res:any) => {     
        console.log(res);
        if (res.status==1) {
          this.notificationList = res.notifications;
          this._loader.stopLoader('loader')
        }
  
    })
         
  }

}

