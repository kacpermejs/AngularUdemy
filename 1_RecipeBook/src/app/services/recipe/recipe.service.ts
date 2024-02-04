import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "Roasted Root Vegetables", 
      "Hearty and nourishing.",
      "https://www.simplyrecipes.com/thmb/Eo98oDvp8kFP7EU7EqCfWTUVaa8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2014__03__roasted-root-vegetables-tomatoes-kale-vertical-a2-1200-c3a715ac7b3549d58cbd00e89c97adeb.jpg"),
    new Recipe(
      "Roasted Root Vegetables 2", 
      "Hearty and nourishing too.",
      "https://www.simplyrecipes.com/thmb/Eo98oDvp8kFP7EU7EqCfWTUVaa8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2014__03__roasted-root-vegetables-tomatoes-kale-vertical-a2-1200-c3a715ac7b3549d58cbd00e89c97adeb.jpg")
  ]

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() { }
}
