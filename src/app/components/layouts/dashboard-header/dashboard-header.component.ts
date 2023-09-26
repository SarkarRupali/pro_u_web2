import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { MenuShowServiceService } from '../../../services/menu-show-service.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  userDetails: any;
  userId: any = 0;
  notificationLength = 0;
  status: any;
  addclass: any = '';
  backClass: boolean = false;
  constructor(private _api: ApiServiceService, private menuService: MenuShowServiceService, private _router: Router, private _location: Location) { }
  @Input() title: string = '';
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData') || '{}').id;
    // }
    // ionViewWillEnter(){
    this._api.notificationList(this.userId).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 1) {
          this.notificationLength = res.notifications.length;
        }
      })

    this._api.prfileUser(this.userId).subscribe((res: any) => {
      // console.log("user-details "+JSON.stringify(res));
      if (res.status == 1) {
        this.userDetails = res.user;
      }
    })
    this.menuService.currentStatus.subscribe(status => this.status = status)
    const currentUrl = window.location.href;
    console.log(currentUrl)
  }

  ngOnChanges() {
    const currentUrl = window.location.href;
    console.log(currentUrl);
    if (currentUrl.includes('dashboard')) {
      this.addclass = 'dashboard'
    } else this.addclass = ''

    if (currentUrl.includes('dashboard') || currentUrl.includes('search') || currentUrl.includes('internships') || currentUrl.includes('menu') || currentUrl.includes('coursedetails') || currentUrl.includes('topicslide')) {
      this.backClass = false
    } else this.backClass = true;
  }
  changeStatus: boolean = false;
  clickEvent() {

    this.menuService.changeStatus(!this.status)

    console.log('Enter', this.status)
  }

  backPage() {
    this._location.back()
  }

}
