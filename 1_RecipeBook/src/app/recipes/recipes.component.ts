import { Component } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { Recipe } from '../models/recipe.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, RecipeListComponent, RecipeDetailComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  
  selectedRecipe?: Recipe;

  storeSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
