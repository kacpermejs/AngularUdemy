import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { Ingredient } from '../models/ingredient.model';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '../services/shopping-list/shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ShoppingListState } from '../store/shopping-list/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingListEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<ShoppingListState>;
  //igAddedSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService, 
    private store: Store<{shoppingList: ShoppingListState}>) {}

  ngOnInit(): void {
    // this.igAddedSubscription =
    //   this.shoppingListService.ingredientsChanged.subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
    // this.ingredients = this.shoppingListService.getIngredients();

    this.ingredients = this.store.select('shoppingList');
  }
  
  ngOnDestroy(): void {
    //this.igAddedSubscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
