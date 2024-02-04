import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { DropdownDirective } from '../../directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, DropdownDirective],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

  @Input() recipe: Recipe;

  constructor(private slService: ShoppingListService) {}

  addToShoppingList() {
      this.slService.addIngredients(this.recipe.ingredients);
  }
}
