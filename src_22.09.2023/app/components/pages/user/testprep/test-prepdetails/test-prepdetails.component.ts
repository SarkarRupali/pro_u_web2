import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";
import Swal from "sweetalert2";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
import { ApiServiceService } from '../../../../../services/api-service.service';
import { environment } from '../../../../../../environments/environment';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-prepdetails',
  templateUrl: './test-prepdetails.component.html',
  styleUrls: ['./test-prepdetails.component.css']
})
export class TestPrepdetailsComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _api: ApiServiceService, private _loader: NgxUiLoaderService, private location: Location, private formBuilder: FormBuilder) {
    this.examDetails = JSON.parse(localStorage.getItem('detail')!)
  }

  ngOnInit(): void {
  }

  examDetails: any = {};
  read: boolean = false;

  // Method call to read description in full mode
  readMode() {
    this.read = !this.read
  }

  customOptions2: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    margin: 15,
    responsive: {
      0: {
        items: 1.2
      },
      400: {
        items: 2.2
      },
      760: {
        items: 3
      },
    },
    nav: false,
    autoHeight: false,
    autoWidth: true
  }

  modeuleDetials(module: any) {
    localStorage.setItem('module', JSON.stringify(module))
    this.router.navigateByUrl('/user/testprepsubject')
  }

}
