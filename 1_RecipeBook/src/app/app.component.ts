import { Component, OnInit, enableProdMode, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { environment } from '../environments/environment';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ShoppingListComponent, RecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'RecipeBook';

  constructor(private store: Store<fromApp.AppState>) {
    console.log('Env prod: ' + environment.production);
    if (environment.production) {
      enableProdMode();
    }
    console.log('Is dev mode: ' + isDevMode());
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.autoLogin());
    this.store.dispatch
  }
}
