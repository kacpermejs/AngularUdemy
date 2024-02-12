import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { DropdownDirective } from '../directives/dropdown.directive';
import { RouterModule } from '@angular/router';
import { DataStorageService } from '../services/data-storage/data-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class HeaderComponent {
  Site = Site;
  collapsed = true;

  constructor(private dataService: DataStorageService) {}
  
  onSaveData() {
    this.dataService.storeRecipes();
    
  }

  private fetchData() {
    this.dataService.getRecipes().subscribe();
  }

  onFetchData() {
    this.fetchData();
  }
  
}
