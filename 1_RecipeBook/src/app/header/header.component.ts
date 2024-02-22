import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { DropdownDirective } from '../directives/dropdown.directive';
import { RouterModule } from '@angular/router';
import { DataStorageService } from '../services/data-storage/data-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';

export enum Site {
  Shopping = 'shopping',
  Recipes = 'recipes'
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DropdownDirective, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  Site = Site;
  collapsed = true;
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataService: DataStorageService, private auth: AuthService) {}
  
  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe( user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
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
    this.auth.logout();
  }

}
