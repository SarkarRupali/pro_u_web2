import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {
  userDetails: any;
  showCountry = 'usd'
  packageList: any = [];
  type: any = ''
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

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 15,
    items: 1.2,
    responsive: {
      0: {
        items: 1.2
      },
      400: {
        items: 2.2
      },
      760: {
        items: 2
      },
    },
    nav: false,
    autoHeight: false,
    autoWidth: false
  }

  constructor(private _loader: NgxUiLoaderService, private _api: ApiServiceService, private router: Router, private _location: Location, private winRef: WindowRefService) { }

  ngOnInit(): void {
    this.getPackageList();
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log('event', this.userDetails)
  }

  selectCountry(event: any) {


    this.showCountry = event.target.value
  }

  /**
   * Method call get package List
   */
  getPackageList() {
    this._loader.startLoader('loader');
    this._api.getPackageList().subscribe(
      res => {
        console.log(res);
        if (res.status == 1) {
          this.packageList = res.packages;
          this._loader.stopLoader('loader');
        } else {
          this._loader.stopLoader('loader');
        }
      }, err => { }
    )
  }


  closePrice() {
    this._location.back();
  }

  payment(event: any) {
    this.type = event

  }

  paymentData() {
    if (this.type == '') {

    } else {
      if (this.type == 1) {
        this.goToPrice()
      } else {
        let pack = {
          name: 'Silver',
          price: 4000,
          validity_in_days: 30
        }
        this.createRzpayOrder(pack)
      }
    }
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


  createRzpayOrder(getPack: any) {

    console.log('getPack', getPack)
    let price = getPack.offer_price == 0 ? getPack.price : getPack.offer_price
    this.payWithRazor(getPack.name, price, getPack.validity_in_days)


  }

  payWithRazor(packageName: any, price: any, validity_days: any) {

    const options: any = {

      key: environment.rzp_key_id,

      amount: 400 * 100, // amount should be in paise format to display Rs 1255 without decimal point

      currency: 'INR',
      name: "ProU App",
      prefill: {
        email: this.userDetails.email,
        contact: this.userDetails.mobile,
        name: this.userDetails.name
      },

      description: packageName + " Subscription",  // product description

      image: '../../../../../assets/logo.png', // company logo or product image

      // order_id: val, // order_id created by you in backend

      modal: {

        // We should prevent closing of the form when esc key is pressed.

        escape: false,

      },

      notes: {

        // include notes if any

      },

      theme: {

        color: '#00c0c9'

      }

    };

    options.handler = ((response: any, error: any) => {

      options.response = response;
      this.initPay(response.razorpay_payment_id, price, validity_days)

      // call your backend api to verify payment signature & capture transaction

    });

    options.modal.ondismiss = (() => {

      // handle the case when user closes the form while transaction is in progress

      console.log('Transaction cancelled.');

    });

    const rzp = new this.winRef.nativeWindow.Razorpay(options);

    rzp.open();

  }


  initPay(payment_id: any, packageAmount: any, validity_days: any) {
    this._loader.startLoader('loader');
    let new_date = moment().add(validity_days, 'days').format('yyyy-MM-DD');
    let today = moment().format('yyyy-MM-DD');
    console.log(new_date);

    var paymentData = new FormData();
    paymentData.append('user_id', this.userDetails.id);
    paymentData.append('amount', packageAmount);
    paymentData.append('start_date', today);
    paymentData.append('end_date', new_date);
    paymentData.append('transaction_id', payment_id);
    this._api.addPackage(paymentData).subscribe(res => {
      console.log('today', res);
      if (res.status == 1) {
        this._loader.stopLoader('loader');
        localStorage.setItem('userData', JSON.stringify(res['user']));
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully Done.'
        })
        this.router.navigate(['/user/dashboard']).then(() => {
          window.location.reload();
        });
      } else {
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong. Please try again.'
        })

      }
    }, err => {
      this._loader.stopLoader('loader');
      this.Toast.fire({
        icon: 'error',
        title: 'Something went wrong. Please try again.'
      })
    });
  }
}

