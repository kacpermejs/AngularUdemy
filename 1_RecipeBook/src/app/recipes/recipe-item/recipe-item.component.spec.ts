import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemComponent } from './recipe-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';

describe('RecipeItemComponent', () => {
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<RecipeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeItemComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeItemComponent);
    component = fixture.componentInstance;
    component.recipe = new Recipe(
      'mock name',
      'mock desc',
      'mock img path',
      [
        new Ingredient('mock tomato', 1), 
        new Ingredient('mock potato', 1)
      ]
    );
    component.id = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
