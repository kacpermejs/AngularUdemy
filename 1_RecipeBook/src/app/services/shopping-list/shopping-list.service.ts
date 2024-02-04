import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor(private recipeService: RecipeService) { }
}
