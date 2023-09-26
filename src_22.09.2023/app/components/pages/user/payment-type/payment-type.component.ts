import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.css']
})
export class PaymentTypeComponent implements OnInit {
  userDetails: any;

  constructor(private _loader: NgxUiLoaderService, private _api: ApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  goToPrice() {
    this._loader.startLoader('loader');
    console.log('click')
    const data = new FormData();
    data.append('email', this.userDetails.email)
    this._api.budPayIntegration(data).subscribe(res => {
      console.log(res)
      if (res.status == 1) {
        this._loader.stopLoader('loader');
        window.location.href = res.authorization_url;
      } else {
        this._loader.stopLoader('loader');

      }

    })
  }


}
