import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      1,
      "Roasted Root Vegetables", 
      "Hearty and nourishing.",
      "https://www.simplyrecipes.com/thmb/Eo98oDvp8kFP7EU7EqCfWTUVaa8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2014__03__roasted-root-vegetables-tomatoes-kale-vertical-a2-1200-c3a715ac7b3549d58cbd00e89c97adeb.jpg",
      [
        new Ingredient('Egg', 2),
        new Ingredient('Carrot', 3)
      ]),
    new Recipe(
      2,
      "Roasted Root Vegetables 2", 
      "Hearty and nourishing too.",
      "https://www.simplyrecipes.com/thmb/Eo98oDvp8kFP7EU7EqCfWTUVaa8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2014__03__roasted-root-vegetables-tomatoes-kale-vertical-a2-1200-c3a715ac7b3549d58cbd00e89c97adeb.jpg",
      [
        new Ingredient('Egg', 1),
        new Ingredient('Carrot', 8),
        new Ingredient('Eggplant', 2)
      ]),
  ]

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find(r => r.id === id);
  }

  constructor() { }
}
