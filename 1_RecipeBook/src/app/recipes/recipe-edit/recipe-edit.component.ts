import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';
import { map, switchMap, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../../store/recipes/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm?: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        take(1),
        tap((params) => {
          this.id = +params['id'];
          this.editMode = !!params['id'];
        }),
        switchMap(() => {
          return this.activatedRoute.data.pipe(map((data) => data.recipe));
        })
      )
      .subscribe((recipe: Recipe) => {
        console.log(recipe);
        this.initForm(recipe);
      });
  }

  private initForm(recipe?: Recipe) {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode && recipe) {
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  navigateBackToTheList() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );
    if (this.editMode) {
      //this.recipeService.updateRecipe(this.id, newRecipe);
      this.store.dispatch(RecipesActions.updateRecipe({id: this.id, recipe: newRecipe}))
    } else {
      //this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(RecipesActions.addRecipe({recipe: newRecipe}))
    }

    this.navigateBackToTheList();
  }

  onCancel() {
    this.navigateBackToTheList();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(''),
        amount: new FormControl(0, [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$'),
        ]),
      })
    );
  }

  onRemoveIngredient(id: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
