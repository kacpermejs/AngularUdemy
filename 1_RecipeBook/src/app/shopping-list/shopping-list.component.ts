import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromShoppingList from '../store/shopping-list/shopping-list.reducer';
import * as ShoppingListActions from '../store/shopping-list/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingListEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<fromShoppingList.State>;
  //igAddedSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');
  }
  
  ngOnDestroy(): void {
  }

  onEditItem(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit( { id: index} ));
  }
}
