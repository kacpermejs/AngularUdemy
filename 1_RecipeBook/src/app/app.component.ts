import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, Site } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ShoppingListComponent, RecipesComponent],
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
