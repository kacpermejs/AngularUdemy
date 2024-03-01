import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  counterActive = 0;
  counterInactive = 0;
  constructor() { }

  incrementActive() {
    this.counterActive++;
    console.log("Active: " + this.counterActive);
  }

  incrementInactive() {
    this.counterInactive++;
    console.log("Inactive: " + this.counterInactive);
  }

}
