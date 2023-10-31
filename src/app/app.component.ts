import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from "@angular/router";
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';

  public webBlock: boolean = false;
  constructor(private _router: Router) {
    _router.events.forEach((event: any) => {

      if (event instanceof NavigationStart) {
        this.webBlock = false;

        // if (event['url'].includes('/user/')){
        if (event['url'] == '/login' || event['url'] == '/register' || event['url'] == '/forgot-password' || event['url'] == '/welcome' || event['url'] == '/privacypolicy' || event['url'] == '/terms') {
          this.webBlock = true;
        } else {

        }
      }
    });
  }

  ngOnInit() {
    AOS.init();
    AOS.refresh();//refresh method is called on window resize and so on, as it doesn't require to build new store with AOS elements and should be as light as possible.

  }

  setHeader() {
    let path = this._router.url.split('/');
    let path1 = this._router.url.split('/')[path.length - 1];

    if (path.includes('coursedetails')) {
      this.title = 'course details'
    } else if (path.includes('quizslide')) {
      this.title = 'quiz'
    } else if (path.includes('quiz')) {
      this.title = ''
    } else if (path.includes('resources_details')) {
      this.title = 'resources details'
    } else if (path.includes('internships')) {
      this.title = 'courses'
    } else if (path.includes('testPrep')) {
      this.title = 'JAMB (UTME)'
    } else if (path.includes('testprepsubject')) {
      this.title = 'JAMB (UTME) subject selection'
    } else if (path.includes('testpreppaper')) {
      this.title = 'Subject configuration'
    } else if (path.includes('viewResult')) {
      this.title = 'View Result'
    } else if (path.includes('country')) {
      this.title = 'Country'
    } else if (path.includes('faq')) {
      this.title = "FAQ'S"
    } else if (path.includes('university')) {
      this.title = 'University'
    } else {
      this.title = decodeURIComponent(path1);
      if (this.title.includes('_')) {
        this.title = this.title.replace('_', ' ')
      }
    }

  }
}