import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiServiceService } from './api-service.service' ;

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  constructor( private _api:ApiServiceService,private _router:Router ) { }

  canActivate():boolean{
    let token = this._api.isAuthenticated();
    if(token){
      return true;
    }else{
      this._router.navigate(['/welcome']);
      return false;
    }
  }
}
