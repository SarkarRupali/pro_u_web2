import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refer-earn',
  templateUrl: './refer-earn.component.html',
  styleUrls: ['./refer-earn.component.css']
})
export class ReferEarnComponent implements OnInit {
  userDetails: any = {};
  user_points: any[] = [];
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

  constructor(private _api: ApiServiceService) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userData') || '{}');

    this.getGiftCard();
  }

  /**
   * Method call to get all  points by user
  */
  getGiftCard() {
    this._api.getPoints(this.userDetails.id).subscribe((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.user_points = res.user_points
      } else {

      }
    })
  }

  /**
   * Method call to copy reffercode
   * @param val 
   */
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.Toast.fire({
      icon: 'success',
      title: 'Successfully copied.'
    })
  }

}
