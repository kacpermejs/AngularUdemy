import { Component, OnInit, enableProdMode, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, Site } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, ShoppingListComponent, RecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'RecipeBook';

  constructor(private auth: AuthService) {
    console.log('Env prod: ' + environment.production);
    if (environment.production) {
      enableProdMode();
    }
    console.log('Is dev mode: ' + isDevMode());
  }

  ngOnInit(): void {
    this.auth.autoLogin();
  }
}
