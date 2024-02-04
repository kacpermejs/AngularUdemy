import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownDirective } from '../directives/dropdown.directive';

export enum Site {
  Shopping = 'shopping',
  Recipes = 'recipes'
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DropdownDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  Site = Site;
  collapsed = true;

  @Output() onNavigation = new EventEmitter<Site>;

  navigate(site: Site) {
    this.onNavigation.emit(site);
  }
}
