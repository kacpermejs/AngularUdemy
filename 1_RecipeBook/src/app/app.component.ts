import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, Site } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ShoppingListComponent, RecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RecipeBook';

  Site = Site;
  currentSite: Site = Site.Recipes;

  onNavigation(site: Site) {
    this.currentSite = site;
  }
}
