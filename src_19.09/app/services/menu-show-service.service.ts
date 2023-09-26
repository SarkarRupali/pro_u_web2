import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuShowServiceService {

  private statusSource = new BehaviorSubject(''); // set default status
  currentStatus = this.statusSource.asObservable();

  constructor() { }

  changeStatus(status: any) {
    this.statusSource.next(status)
    console.log('stsa', status)
  }
}
