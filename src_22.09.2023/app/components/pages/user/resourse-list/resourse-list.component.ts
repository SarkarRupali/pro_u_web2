import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
@Component({
  selector: 'app-resourse-list',
  templateUrl: './resourse-list.component.html',
  styleUrls: ['./resourse-list.component.css']
})
export class ResourseListComponent implements OnInit {
  resourseDetails:any={};
  constructor(private _location : Location) { }

  ngOnInit(): void {
    this.resourseDetails = JSON.parse(localStorage.getItem('resourse')|| '{}');
    console.log(this.resourseDetails);
    
  }

  gotoBack(){
    this._location.back()
  }

}
