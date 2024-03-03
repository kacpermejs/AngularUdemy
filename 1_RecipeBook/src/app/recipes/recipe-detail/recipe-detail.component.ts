import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { DropdownDirective } from '../../directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../../store/shopping-list/shopping-list.actions';
import * as RecipesActions from '../../store/recipes/recipes.actions';

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
    private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.recipe = data.recipe;
    });
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  addToShoppingList() {
    this.store.dispatch(ShoppingListActions.addIngredients({ingredients: this.recipe.ingredients}));
  }

  onDelete() {
    this.store.dispatch(RecipesActions.deleteRecipe({ id: this.id }));
    this.router.navigate(['/recipes']);
  }
}
