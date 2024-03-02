import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { DropdownDirective } from '../directives/dropdown.directive';
import { DataStorageService } from '../services/data-storage/data-storage.service';
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../store/auth/auth.actions";

export enum Site {
  Shopping = 'shopping',
  Recipes = 'recipes'
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DropdownDirective, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  Site = Site;
  collapsed = true;
  userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private dataService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onSaveData() {
    this.dataService.storeRecipes();
  }

  private fetchData() {
    this.dataService.fetchRecipes().subscribe();
  }

  onFetchData() {
    this.fetchData();
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
