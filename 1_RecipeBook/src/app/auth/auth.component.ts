import { CommonModule } from '@angular/common';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../services/auth/auth.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, AlertComponent, PlaceholderDirective],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error?: string = null;
  authSub: Subscription;

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
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

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password); 
    }

    this.authSub = authObs.subscribe({
      next: res => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    }); 

    form.reset();
  }

  onHandleError() {
    this.error = null;
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
