import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { DropdownDirective } from '../../directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, DropdownDirective],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private slService: ShoppingListService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.recipe = data.recipe;
    });
  }

  addToShoppingList() {
      this.slService.addIngredients(this.recipe.ingredients);
  }
}
