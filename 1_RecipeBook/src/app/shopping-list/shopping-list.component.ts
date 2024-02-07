import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { Ingredient } from '../models/ingredient.model';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../services/shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingListEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  igAddedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    this.igAddedSubscription = shoppingListService.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }
  
  ngOnDestroy(): void {
    this.igAddedSubscription.unsubscribe();
  }
}
