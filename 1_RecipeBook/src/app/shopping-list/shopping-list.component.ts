import { Component, OnInit } from '@angular/core';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { Ingredient } from '../models/ingredient.model';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingListEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {
    shoppingListService.ingredientAdded.subscribe(() => {
      this.ingredients = shoppingListService.getIngredients();
    });
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

}
