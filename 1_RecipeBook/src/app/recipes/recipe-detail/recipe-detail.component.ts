import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { DropdownDirective } from '../../directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownDirective],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {

  recipe?: Recipe;
  id?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private slService: ShoppingListService, 
    private recipeService: RecipeService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.recipe = data.recipe;
    });
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  addToShoppingList() {
      this.slService.addIngredients(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
