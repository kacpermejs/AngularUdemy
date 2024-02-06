import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { DropdownDirective } from '../directives/dropdown.directive';
import { RouterModule } from '@angular/router';

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
}
