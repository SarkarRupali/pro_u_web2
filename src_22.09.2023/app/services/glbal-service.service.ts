import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlbalServiceService {

  constructor() { }

  nativeGlobal() { return window as any }
}
