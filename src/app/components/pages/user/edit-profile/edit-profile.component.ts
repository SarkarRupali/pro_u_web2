import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from "sweetalert2";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { saveAs } from 'file-saver';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { Location } from '@angular/common'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  data = { name: '', email: '', mobile: '', password: '', gender: '', city: '', country: '', otherCountry: '', dob: '' };
  userId: any = '';
  userData: any = [];
  file: any;
  nameValid = false;
  emailvalid = false;
  phValid = false;
  public cityValid = false;
  countryData: any[] = [];
  universityList: any[] = [];
  public othersCountry = false;
  public submitted = false;
  countryValid = false;
  uploadButn = false;
  uploadResumeBtn = false;
  certificateList: any = [];
  newsletter: boolean = false;
  study: boolean = false;
  privacy: boolean = false;
  resumeData = '';
  profileImage = environment.profileImage;
  alert = false;
  public countryImage = '';
  public countryCode = '';
  searchCountry: any = [];
  searchinput = '';
  isMobileDevice = false;
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
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 2
      },
    },
    nav: false,
    autoHeight: false,
    autoWidth: false
  }

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

  @ViewChild('countryModalClose') modalClose!: ElementRef<HTMLElement>;
  constructor(private _api: ApiServiceService, private _loader: NgxUiLoaderService, private _location: Location) { }
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userData') || '{}').id;
    let details = navigator.userAgent;
    /* Creating a regular expression
      containing some mobile devices keywords
      to search it in details string*/
    let regexp = /android|iphone|kindle|ipad/i;

    /* Using test() method to search regexp in details
    it returns boolean value*/
    this.isMobileDevice = regexp.test(details);
    console.log('details', this.isMobileDevice)
    this.getProfile();
    this.getCertificateList();

  }

  /**
   * 
   */
  getProfile() {
    this._api.prfileUser(this.userId).subscribe((res: any) => {
      console.log(res);
      if (res.status == 1) {
        this.userData = res.user;
        this.countryCode = res.user.countryCode == null ? "+91" : res.user.countryCode;
        this.newsletter = res.user.is_subscribed_for_newsletter == 1 ? true : false;
        this.study = res.user.is_interested_in_study_abroad == 1 ? true : false;
        this.privacy = res.user.is_agree_to_terms_and_conditions == 1 ? true : false;
        this.resumeData = res.user.resume;
        if (this.userData.country.match('India') || this.userData.country.match('Nigeria') || this.userData.country.match('UAE')) {
          this.userData.country = this.userData.country.trim();
          this.othersCountry = false;
        } else {
          this.userData.otherCountry = this.userData.country;
          this.userData.country = 'Others';
          this.othersCountry = true;
        }
        console.log('this.countryCode ', this.countryCode)

      }
    })
    this.getCountryCode();
  }

  // Method call to get all country code
  getCountryCode() {
    this._loader.startLoader('loader');
    this._api.getcountry().subscribe(res => {
      console.log('country', res)
      if (res.status == '1') this.countryData = res.countries;
      this.countryData.unshift({
        'image': 'https://flagpedia.net/data/flags/normal/in.png',
        'phonecode': '91',
        'name': 'India'
      })
      this.countryData.forEach(el => {
        if ('+' + el.phonecode == this.countryCode) {
          this.countryImage = el.image
        }
      })
      this.searchCountry = this.countryData
      console.log('countryImage', this.countryImage)

    })
  }
  // Method call to choose a country and close a modal
  chooseCountry(data: any, image: string) {
    this.countryCode = '+' + data;
    this.countryImage = image
    this.modalClose.nativeElement.click();
    this.countryData = this.searchCountry;
    this.searchinput = '';
  }

  /**
  * Method call to select country 
 */
  selectCountry(event: any) {
    console.log(event);
    console.log(event.target.value);

    if (event.target.value == 'Others') {
      this.othersCountry = true;
    } else {
      this.othersCountry = false;
    }
  }

  /**
   * Method call to search a country 
  */
  search(event: any) {
    let searchData = event.target.value
    if (searchData.includes('+')) searchData = searchData.slice(1);
    if (searchData.length > 0) {
      this.countryData = this.searchCountry.filter((el: any) => {
        // console.log(this.countryData)
        return (el.phonecode.indexOf(searchData) > -1 || el.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
      })
    } else this.countryData = this.searchCountry
  }

  cancelUpload() {
    // this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    // this.uploadProgress = null;
    // this.uploadSub = null;
  }

  /**
  * Method call to check if firstname input empty or not
 */
  addName(event: any) {
    console.log(event);

    if (event == '') {
      this.nameValid = true;
    } else {
      this.nameValid = false;
    }
    console.log('this.nameValid', this.nameValid);

  }

  /**
   * Method call to check if email input empty or not
  */
  addEmail(event: any) {
    if (event == '') {
      this.emailvalid = true;
    } else {
      this.emailvalid = false;
    }
  }

  /**
   * Method call to check if mobile number empty or not
  */
  addph(event: any) {
    if (event == '') {
      this.phValid = true;
    } else {
      this.phValid = false;
    }
  }

  /**
   * Method call to check if city empty or not
  */
  addCity(event: any) {
    if (event == '') {
      this.cityValid = true;
    } else {
      this.cityValid = false;
    }
  }

  /**
  * Method call to check if country empty or not
 */
  addCountry(event: any) {
    if (event == '') {
      this.countryValid = true;
    } else {
      this.countryValid = false;
    }
  }



  // Method call to get all college List
  getCollegeList() {
    this._loader.startLoader('loader');
    this._api.getCollageName().subscribe(res => {
      console.log(res);
      if (res.status == '1') this.universityList = res.colleges;
      this._loader.stopLoader('loader');
    })
  }


  onFileSelected(event: any) {
    console.log('event', event);

    const file: File = event.target.files[0];
    console.log(file);


    if (file) {
      this.uploadButn = true;
      this.file = file;
      // const upload$ = this.http.post("/api/thumbnail-upload", formData, {
      //     reportProgress: true,
      //     observe: 'events'
      // })
      // .pipe(
      //     finalize(() => this.reset())
      // );

      // this.uploadSub = upload$.subscribe(event => {
      //   if (event.type == HttpEventType.UploadProgress) {
      //     this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      //   }
      // })
    }
  }

  onresumeSelected(event: any) {
    this.file = '';
    const file: File = event.target.files[0];
    if (file) {
      this.uploadResumeBtn = true;
      this.file = file;
    }
  }

  // Method call to upload image
  uploadImage(type: any) {
    this._loader.startLoader('loader');
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this._api.profileImage(formData).subscribe(res => {
      console.log('image', res)
      if (res.status == '1') {
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'success',
          title: type == 'image' ? 'Successfully uploaded profile image' : 'Successfully uploaded resume'
        });
        if (type == 'image') this.userData.image = res.image;
        if (type == 'resume') this.userData.resume = res.image;
      }
      else {
        this._loader.stopLoader('loader');
        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong. Please try again.'
        });
      }
    })
  }


  editProfile(form: any) {
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }
    if (form.value.name == '') {
      this.nameValid = true;
    }
    if (form.value.email == '') {
      this.emailvalid = true;
    }
    if (form.value.mobile == '') {
      this.phValid = true;
    }
    if (form.value.city == null || form.value.city == '') {
      this.cityValid = true;
    }

    if (form.value.country == 'Others' && form.value.otherCountry == "") {
      this.countryValid = true;
    }
    this.submitted = true;
    if (form.valid) {
      this._loader.startLoader('loader');
      form.value.country == 'Others' ? form.value.country = form.value.otherCountry : form.value.otherCountry;
      const mainData = form.value;
      const formData = new FormData();
      formData.append("id", this.userId);
      formData.append("name", mainData.name);
      formData.append("email", mainData.email);
      formData.append("mobile", mainData.mobile);
      formData.append("gender", mainData.gender);
      formData.append("city", mainData.city);
      formData.append("country", mainData.country);
      formData.append("countryCode", this.countryCode);
      formData.append("image", this.userData.image);
      formData.append("resume", this.userData.resume);
      formData.append("dob", this.userData.dob);
      formData.append("field_of_study", this.userData.field_of_study);
      formData.append("industry_best_suitable", this.userData.industry_best_suitable);
      formData.append("is_subscribed_for_newsletter", this.newsletter == true ? '1' : '0');
      formData.append("is_interested_in_study_abroad", this.study == true ? '1' : '0');
      formData.append("is_agree_to_terms_and_conditions", this.privacy == true ? '1' : '0');
      formData.append("i_am", this.userData.i_am);

      this._api.prfileUpdate(formData).subscribe(
        res => {
          if (res?.status == 0) {
            this.Toast.fire({
              icon: 'error',
              title: res?.message
            });
            this._loader.stopLoader('loader');
          } else {
            localStorage.removeItem('userData');
            localStorage.setItem('userData', JSON.stringify(res['user']));
            this._location.back()
            this.Toast.fire({
              icon: 'success',
              title: 'Successfully updated profile'
            });
          }
        })
    }
  }

  // *************************************** CERTIFICATE ************************************* //

  // Method call to get all certificates
  getCertificateList() {
    this._loader.startLoader('loader')
    this._api.certificateList(this.userId).subscribe(res => {
      if (res.status == 1) this.certificateList = res.certificates
      console.log('this.certificateList', this.certificateList)
      this._loader.stopLoader('loader')
    })
  }

  // Method call to share certificate
  shareCertificate(certificateURl: any) {
    // let msg = `Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/`
    // this.socialSharing.share(msg + certificateURl, certificateURl, '').then((res) => {

    // }).catch((err) => {

    this.alert = true;
    // })
  }

  // Method call to download certificate
  certificateDownload(pdfUrl: any) {
    let file = `https://backend.proueducation.com/assets/upload/pdf/${pdfUrl}`
    saveAs(file, pdfUrl)
  }

  sharefacebookUrl(certificateURl: any) {
    console.log('test facebook')
    // let searchParams = new URLSearchParams();
    let msg = `Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/${certificateURl}`
    // searchParams.set('u', msg);

    window.open('https://www.facebook.com/sharer/sharer.php?' + msg);
    return false
  }



  shareinstaUrl(certificateURl: any) {
    let msg = `Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/${certificateURl}`
    window.open('https://instagram.com/accounts/login/?text=%20Check%20up%20this%20awesome%20content' + encodeURIComponent(document.title) + ':%20 ' + encodeURIComponent(msg));
    return false;
  }

  shareWhatsppUrl(certificate_name: any) {
    // Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/{{certificate.certificate_name}}
    window.open('https://web.whatsapp.com://send?text= Your Certificate Link : https://backend.proueducation.com/assets/upload/pdf/{{certificate.certificate_name}}');
  }

}

