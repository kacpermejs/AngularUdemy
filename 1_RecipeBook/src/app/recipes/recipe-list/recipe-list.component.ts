import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { RecipeItemComponent } from '../recipe-item/recipe-item.component';
import { RouterModule } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesChangedSub: Subscription;
  
  constructor(private store: Store<fromApp.AppState>) {}
  
  ngOnInit(): void {
    // this.recipes = this.recipeService.getRecipes();
    
    this.recipesChangedSub = this.store.select('recipes')
      .pipe(
        map(r => r.recipes)
      )
      .subscribe( (r: Recipe[]) => {;
      this.recipes = r;
    });
  }

  ngOnDestroy(): void {
    this.recipesChangedSub.unsubscribe();
  }
}
