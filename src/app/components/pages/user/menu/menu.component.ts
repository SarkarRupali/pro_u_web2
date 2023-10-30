import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../../services/api-service.service';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userId: any;
  userName: any;
  userImage: any = '';
  referral_code: any = '';
  baseImage = environment.profileImage;
  constructor(public _api: ApiServiceService, private _loader: NgxUiLoaderService,) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userData') || '{}').id;
    this._api.prfileUser(this.userId).subscribe(res => {
      this.userName = res.user.name
      this.userImage = res.user.image == 'null' ? '' : this.baseImage + res.user.image
      this.referral_code = res.user.referral_code
    })

  }

  logoutAdmin() {
    this._loader.startLoader('loader');
    // this.closeMenu()
    this._api.logoutUser();
    this._loader.stopLoader('loader');
  }
}
