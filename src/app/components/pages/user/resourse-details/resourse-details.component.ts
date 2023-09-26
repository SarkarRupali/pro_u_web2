import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-resourse-details',
  templateUrl: './resourse-details.component.html',
  styleUrls: ['./resourse-details.component.css']
})
export class ResourseDetailsComponent implements OnInit {
  resourseDetails: any = {};
  resouseId: any;
  isMobileDevice: any = false;
  constructor(private location: Location, private _activated: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let resourseList = JSON.parse(localStorage.getItem('resourse') || '{}');
   
    this.resouseId = this._activated.snapshot.paramMap.get('resourseId');
    this.resourseDetails = resourseList.resources.find((ele: any) => ele.id == this.resouseId);
    // resourseList.forEach((element: any) => {
      this.resourseDetails.description = `<style>
        p {
          margin-bottom: 20px;
        }
      </style>` + this.resourseDetails.description
      this.resourseDetails.description = this.sanitizer.bypassSecurityTrustHtml(this.resourseDetails.description);
    // });
    let details = navigator.userAgent;
    /* Creating a regular expression
      containing some mobile devices keywords
      to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    this.isMobileDevice = regexp.test(details);
  }

  goToBack() {
    this.location.back()
  }

  // shareResourse(name: any, siteURl: any) {
  //   window.open("https://web.whatsapp.com://send?text= Plesae check site for" + name + siteURl, '_blank');
  //   // window.open(`https://web.whatsapp.com://send?text=Plesae check site for ${name} ${siteURl}`);  
  // }

}
