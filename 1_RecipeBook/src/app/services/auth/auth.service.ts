import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private tokenExpirationTimer?: any;

  constructor(private store: Store<fromApp.AppState>) { }

  setLogoutTimer(expirationDuration: number) {
    console.log('timer set to %d s', expirationDuration / 1000); 
    
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    console.log('timer cleared');
    
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

}
