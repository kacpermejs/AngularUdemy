import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() id: number;
  @Input() recipe: Recipe;
  
  constructor() {}
}
