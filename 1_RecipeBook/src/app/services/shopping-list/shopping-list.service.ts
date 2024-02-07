import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Tomato', 2),
    new Ingredient('Potato', 8),
  ];

  ingredientAdded = new Subject<Ingredient[]>();

  constructor() {
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);

    this.ingredientAdded.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);

    this.ingredientAdded.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
