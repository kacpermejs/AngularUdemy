import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private recipesEndpoint = environment.apiUrl + 'recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.recipesEndpoint)
    .pipe(
      map( recipes => {
        if (recipes != null) {
          return recipes.map( recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }
        return [];
      }),
      tap( r => {
        this.recipeService.setRecipes(r);
      })
    );
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipesEndpoint, recipes).subscribe( r => {
      console.log(r);
    });

  }
}
