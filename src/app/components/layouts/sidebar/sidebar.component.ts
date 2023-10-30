import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from '../../../services/api-service.service'
import { MenuShowServiceService } from '../../../services/menu-show-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  status: any;
  isMobileDevice = false;
  constructor(private _api: ApiServiceService, private _loader: NgxUiLoaderService, private menu: MenuShowServiceService) { }

  ngOnInit(): void {
    this.menu.currentStatus.subscribe(status => this.status = status);
    let details = navigator.userAgent;
    /* Creating a regular expression
      containing some mobile devices keywords
      to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    this.isMobileDevice = regexp.test(details);

  }

  closeMenu() {
    this.menu.changeStatus(!this.status)
  }


  logoutAdmin() {
    this._loader.startLoader('loader');
    this.closeMenu()
    this._api.logoutUser();
    this._loader.stopLoader('loader');
  }
  changeStatus: boolean = false;
  clickEvent() {
    this.menu.changeStatus(!this.status)
  }
}
