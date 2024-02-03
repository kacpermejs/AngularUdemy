import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe(
      "Roasted Root Vegetables", 
      "Hearty and nourishing.",
      "https://www.simplyrecipes.com/thmb/Eo98oDvp8kFP7EU7EqCfWTUVaa8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2014__03__roasted-root-vegetables-tomatoes-kale-vertical-a2-1200-c3a715ac7b3549d58cbd00e89c97adeb.jpg")
  ]

  @Output() onRecipeListItemSelected = new EventEmitter<Recipe>();

  recipeItemSelected(recipe: Recipe) {
    this.onRecipeListItemSelected.emit(recipe);
  }
}
