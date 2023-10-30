import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Location } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import VimeoPlayer from '@vimeo/player';
@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',
  styleUrls: ['./single-topic.component.css']
})
export class SingleTopicComponent implements OnInit {
  topicDetials: any = {};
  slidelength = 0;
  finishBtn: boolean = false;
  assignmentFileName = '';
  isPlaying = false;
  topicSlide: any = [];
  nextBtn = false;
  preVBtn = false;
  currentIndex: number = 0;
  topiccustomOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
    margin: 0,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      760: {
        items: 1
      },
      1000: {
        items: 1
      }
    },
    nav: true,
    autoHeight: true,
    autoWidth: false
  }
  data: any = [1, 2, 3]
  // @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('vimeoPlayer') vimeoPlayerRef!: ElementRef<HTMLIFrameElement>;
  player!: VimeoPlayer;

  constructor(private sanitizer: DomSanitizer, private router: Router, private location: Location,) { }
  isLandscape: boolean = window.innerWidth > window.innerHeight;


  // @HostListener('window:resize', ['$event'])
  // onWindowResize(event: any) {
  //   this.isLandscape = event.target.innerWidth > event.target.innerHeight;
  //   this.reload()
  // }
  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event) {
    event.preventDefault();
  }

  ngOnInit(): void {
    localStorage.removeItem('topicName')
    this.topicDetials = JSON.parse(localStorage.getItem('topics') || '{}');
    this.topicDetials.slides.forEach((element: any) => {
      element.content = `<style>
        p{
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          margin: 0 0 12px;;
          text-align: left;
      }
      p:last-child{
          margin-bottom: 0;
      }
      ol {
        margin-left: 20px;
      }
      h1{
          font-size: 17px;
          font-weight: 600;
          color: var(--ion-color-nero);
          line-height: 1.35;
          margin:0 0 12px;
      }
      h2{
          font-size: 16px;
          font-weight: 600;
          color: var(--ion-color-nero);
          line-height: 1.35;
          margin:0 0 12px;
      }
      h3{
          font-size: 15px;
          font-weight: 600;
          color: var(--ion-color-nero);
          line-height: 1.35;
          margin:0 0 12px;
      }
      h4{
          font-size: 14px;
          font-weight: 600;
          color: var(--ion-color-nero);
          line-height: 1.35;
          margin:0 0 12px;
      }
      h5{
          font-size: 13px;
          font-weight: 600;
          color: var(--ion-color-nero);
          line-height: 1.35;
          margin:0 0 12px;
      }
      ul{
          padding-left: 18px;
          margin: 0 0 15px;
          list-style: disc;
          li{
              padding-left: 0;
              font-size: 14px;
              color: var(--ion-color-nero);
              margin-bottom: 5px;
          }
      }
      iframe{
        height: 100%;
          width: 100%;
          aspect-ratio: 16 / 10;
          margin: 10px 0;
      }
      img{
        width:100%;
        display:block;
        margin-bottom:15px;
      }
      .topic-slider .owl-stage-outer {
        padding-bottom: 40px !important;
    }
      </style>` + element.content
      element.content = this.sanitizer.bypassSecurityTrustHtml(element.content);
      if (element.video_link) {
        element.video_link = this.sanitizer.bypassSecurityTrustResourceUrl(element.video_link);


        // const iframe = document.querySelector('iframe');
        // this.player = new VimeoPlayer('iframe');

        // console.log('player ****', this.player)
        // this.player.on('fullscreenchange', (event) => {
        //   if (event.detail.fullscreen) {
        //     // Entered full-screen
        //     console.log('Entered full-screen mode');
        //   } else {
        //     // Exited full-screen
        //     console.log('Exited full-screen mode');
        //   }
        // });
      }
    });
    console.log('topicSlide', this.topicDetials.slides)

    this.topicSlide = this.topicDetials.slides[0];
    if (this.topicDetials.slides.length == 1) {
      this.finishBtn = true;
      this.nextBtn = false;
      this.preVBtn = false;
    } else {
      this.finishBtn = false;
      this.nextBtn = true;
      // this.preVBtn = true;
    }


    if (this.topicDetials.assignment == '') {
      this.slidelength = this.topicDetials.slides.length
    } else {
      this.slidelength = this.topicDetials.slides.length + 1
      let assignmentFile = this.topicDetials.assignment_file.split('/')
      this.assignmentFileName = assignmentFile[assignmentFile.length - 1];

    }
  }

  ngAfterViewInit() {


    // this.player = new Player(this.vimeoPlayerRef.nativeElement);





    // Handle orientation change event
    window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));

    // Play the video
    // this.player.play().then(() => {
    //   this.isPlaying = true;
    // });


  }

  handleOrientationChange() {
    if (this.isPlaying) {
      this.player.play();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('orientationchange', this.handleOrientationChange);
  }
  /**
   * Method call after change slider
   * @param event 
   */
  getData(event: any) {
    if (this.slidelength == event.startPosition + 1) {
      this.finishBtn = true
    } else {
      this.finishBtn = false
    }
  }

  // Method call to stop video after slide changed
  stopVideo() {
    // const iframe = this.videoPlayer.nativeElement;

    // iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');

    // this.vimeoPlayer = new VimeoPlayer(iframe);
    // this.vimeoPlayer.pause();
  }


  // Method call to stop reload page
  reload() {
    if (this.isPlaying) {
      this.stopVideo();
    }
  }

  /**
   * Method call to click on finish button
   */
  finishButtonCall(topicId: number, topicName: any) {
    localStorage.setItem('topicName', topicName)
    // this.router.navigateByUrl('/user/quiz/' + topicId, { skipLocationChange: true })
    this.router.navigateByUrl('/user/quiz/' + topicId)
  }
  goToBack() {
    this.location.back();
  }

  downLoadAssignment(file: any) {

    saveAs(file, this.assignmentFileName)
    // console.log('file',file);
    // const url = window.URL.createObjectURL(file);
    // window.open(url);


    //   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //     window.navigator.msSaveOrOpenBlob(blob, fileName);
    //     return;
    //    }
    //    // Other Browsers
    //    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    //    const link = this.renderer.createElement('a');
    //    this.renderer.setAttribute(link, 'download', fileName);
    //    this.renderer.setAttribute(link, 'href', url);
    //    this.renderer.setAttribute(link, 'target', '_blank');
    //    this.renderer.appendChild(this.elementRef.nativeElement, link);
    //    link.click();
    //    this.renderer.removeChild(this.elementRef.nativeElement, link);

    //    setTimeout(() => {
    //     window.URL.revokeObjectURL(url);
    //    }, 1000);
  }

  // Method call to go to next slide
  nextSlide(topicslideid: any) {
    console.log('*******', this.topicSlide)
    // if (this.topicSlide.id == this.topicDetials.slides[this.topicDetials.slides.length - 1].id) {
    //   this.preVBtn = true;
    //   this.finishBtn = true;
    //   this.nextBtn = false;
    // } else {
    //   for (let i = 0; i < this.topicDetials.slides.length; i++) {
    //     if (this.topicDetials.slides[i].id === topicslideid) {
    //       this.topicSlide = this.topicDetials.slides[i + 1];
    //     }
    //   }
    //   this.preVBtn = true;
    //   this.finishBtn = false;
    //   this.nextBtn = true;
    // }
    if (this.currentIndex < this.topicDetials.slides.length - 1) {
      this.currentIndex++;
    }

  }

  // Method call to go to pre slide
  preSlide(topicslideid: any) {
    // console.log('pre topicid', topicslideid)
    // if (this.topicSlide.id == this.topicDetials.slides[0].id) {
    //   this.preVBtn = false;
    //   this.finishBtn = false;
    //   this.nextBtn = true;
    // } else {
    //   for (let i = 0; i < this.topicDetials.slides.length; i++) {
    //     if (this.topicDetials.slides[i].id === topicslideid) {
    //       this.topicSlide = this.topicDetials.slides[i - 1];
    //     }
    //   }
    //   this.preVBtn = true;
    //   this.finishBtn = false;
    //   this.nextBtn = true;
    // }
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}

