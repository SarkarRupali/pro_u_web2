import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { saveAs } from 'file-saver';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
  userId: any = '';
  certificateList: any = [];
  alert = false;
  isMobileDevice = false;
  constructor(private _loader: NgxUiLoaderService, private _api: ApiServiceService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData') || '{}').id;
    this.getCertificateList();
    let details = navigator.userAgent;
    /* Creating a regular expression
      containing some mobile devices keywords
      to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    this.isMobileDevice = regexp.test(details);
  }


  // Method call to get all certificates
  getCertificateList() {
    this._loader.startLoader('loader')
    this._api.certificateList(this.userId).subscribe(res => {
      if (res.status == 1) this.certificateList = res.certificates
      this._loader.stopLoader('loader')
    })
  }

  // Method call to share certificate
  shareCertificate() {

    this.alert = true;


    // this.socialSharing.share(msg + certificateURl, certificateURl, '').then((res) => {

    // }).catch((err) => {




    // window.open('https://twitter.com/intent/tweet?text=%20Check%20up%20this%20awesome%20content' + encodeURIComponent(document.title) + ':%20 ' + encodeURIComponent(msg));
    // return false;
  }

  // Method call to download certificate
  certificateDownload(pdfUrl: any) {
    let file = `https://backend.proueducation.com/assets/upload/pdf/${pdfUrl}`
    saveAs(file, pdfUrl)
  }



  sharefacebookUrl(certificateURl: any) {
    let searchParams = new URLSearchParams();
    let msg = `Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/${certificateURl}`
    searchParams.set('u', msg);

    window.open('https://www.facebook.com/sharer/sharer.php?' + msg);
    return false
  }

  sharetweetUrl(certificateURl: any) {
    let msg = `Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/${certificateURl}`
    window.open('https://twitter.com/intent/tweet?text=%20Check%20up%20this%20awesome%20content' + encodeURIComponent(document.title) + ':%20 ' + encodeURIComponent(msg));
    return false;
  }

  // sharemailUrl(certificateURl: any) {
  //   let msg = `Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/${certificateURl}`
  //   window.open('mailto:?subject=' + encodeURIComponent(document.title) + '&body=' + encodeURIComponent(msg));
  //   return false;
  // }

  shareinstaUrl(certificateURl: any) {
    let msg = `Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/${certificateURl}`
    window.open('https://instagram.com/accounts/login/?text=%20Check%20up%20this%20awesome%20content' + encodeURIComponent(document.title) + ':%20 ' + encodeURIComponent(msg));
    return false;
  }

  shareWhatsppUrl(certificate_name: any) {
    // Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/{{certificate.certificate_name}}
    window.open('https://wa.me/?text= Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/{{certificate.certificate_name}}');
  }
}
