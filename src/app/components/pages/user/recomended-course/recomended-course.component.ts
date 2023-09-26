import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomended-course',
  templateUrl: './recomended-course.component.html',
  styleUrls: ['./recomended-course.component.css']
})
export class RecomendedCourseComponent implements OnInit {
  userDetails:any;
  rec_course:any=[];
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userData')||'{}');
    this.rec_course = JSON.parse(localStorage.getItem('rec_course')||'[]')
  }

  courseDetails(id: number) {
    this.router.navigateByUrl('/user/coursedetails/' + id)
  }
}
