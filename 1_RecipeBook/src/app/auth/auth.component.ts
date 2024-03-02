import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, pipe } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../directives/placeholder.directive';
import { AuthResponseData } from '../models/auth-response.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../store/auth/auth.actions';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, AlertComponent, PlaceholderDirective],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error?: string = null;

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid)
      return;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(AuthActions.loginStart({email, password}));
      
    } else {
      this.store.dispatch(AuthActions.signUpStart({email, password}));
    }
    
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  private showErrorAlert(message: string) {
    this.alertHost.viewContainerRef.clear();
    const compRef = this.alertHost.viewContainerRef.createComponent(AlertComponent);
    compRef.instance.message = message;
    this.closeSub = compRef.instance.close.subscribe( () => {
      this.closeSub.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    });
  }
}
