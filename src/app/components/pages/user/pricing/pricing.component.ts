import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
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
  type: any = '';
  selctedPrice: any = 0;
  price: any = 0;
  offerprice: any = 0;
  discountPrice: any = 0;
  totalPrice: any = 0;
  couponText: any = '';
  couponCode: any = '';
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
    loop: false,
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

  constructor(private _loader: NgxUiLoaderService, private _api: ApiServiceService, private router: Router, private _location: Location, private winRef: WindowRefService, private sanitizer: DomSanitizer) { }

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
          this.selctedPrice = 0;
          this.price = this.packageList[0].price
          this.offerprice = this.packageList[0].offer_price
          this.offerprice !== 0 ? this.totalPrice = this.offerprice : this.totalPrice = this.price;
          this.packageList.forEach((element: any) => {
            element.description = `<style>
            
            .pricing_card ul {
              margin: 0 0 16px;
              padding: 0;
              list-style-type: none;
            }
            .pricing_card ul li {
              display: block;
              margin-bottom: 10px;
              color: #000;
              font-size: 10px;
              font-style: normal;
              font-weight: 500;
              line-height: 16px;
              text-align: left;
              padding-left: 26px;
              position: relative;

            }
            
            .pricing_card ul li:before {
                position: absolute;
                width: 16px;
                height: 16px;
                background: url(../../assets/list_icon.svg) center center no-repeat;
                content: '';
                left: 0;
            
            }
            .pricing_card ul li &:last-child {
              margin-bottom: 0;
            }
            </style>` + element.description
            element.description = this.sanitizer.bypassSecurityTrustHtml(element.description);
          })
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

  // Methd call to change price package
  priceChange(index: any) {
    console.log('click')
    this.selctedPrice = index;
    this.price = this.packageList[index].price
    this.offerprice = this.packageList[index].offer_price
  }

  // Method call to apply a promo code
  applyBtn() {
    this._loader.startLoader('loader');
    console.log('this.couponText', this.couponText)
    this._api.couponDetails(this.couponCode).subscribe(res => {
      console.log(res)
      if (res.status == '1') {
        let price = this.offerprice == 0 ? this.price : this.offerprice
        if (res.coupon?.offer_type == 2) {
          this.discountPrice = (price * res.coupon?.offer_rate) / 100;
          this.totalPrice = price - this.discountPrice;
          this._loader.stopLoader('loader');
        } else {
          this.discountPrice = res.coupon?.offer_rate
          this.totalPrice = price - this.discountPrice;
          this._loader.stopLoader('loader');
        }
      } else {
        this.Toast.fire({
          icon: 'warning',
          title: res.message
        })
        this._loader.stopLoader('loader');
      }
    })
  }


  inputChange(event: any) {
    console.log(event)
    this.couponCode = event
    this.discountPrice = 0;
    this.totalPrice = this.offerprice == 0 ? this.price : this.offerprice
  }

  payment(event: any) {
    this.type = event

  }

  paymentData() {
    if (this.type == '') {
      this.Toast.fire({
        icon: 'warning',
        title: 'Please select a payment method'
      });
    } else {
      if (this.type == 1) {
        this.goToPrice()
      } else {
        let pack = {
          name: this.packageList[this.selctedPrice].name,
          price: this.totalPrice,
          validity_in_days: this.packageList[this.selctedPrice].validity_in_days
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
    this.payWithRazor(getPack.name, getPack.price, getPack.validity_in_days)


  }

  payWithRazor(packageName: any, price: any, validity_days: any) {

    const options: any = {

      key: environment.rzp_key_id,

      amount: price * 100, // amount should be in paise format to display Rs 1255 without decimal point

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

