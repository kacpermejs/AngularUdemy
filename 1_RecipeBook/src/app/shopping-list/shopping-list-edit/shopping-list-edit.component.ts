import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) slForm: NgForm;
  igEditSubscription: Subscription;
  editMode = false;
  editedIndex?: number;
  editedItem?: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}
  
  ngOnInit(): void {
    this.igEditSubscription = this.shoppingListService.startedEditing.subscribe(
        (id: number) => {
          this.editedIndex = id;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(id);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  private formReset() {
    this.slForm.reset();
    this.slForm.form.patchValue({
      amount: 0
    })
  }
  
  onClear() {
    this.formReset();
    this.editMode = false;
  }

  onSubmit() {
    const value = this.slForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.formReset();
  }

  onDelete() {
    this.onClear();
    this.shoppingListService.deleteIngredient(this.editedIndex);
  }

  ngOnDestroy(): void {
    this.igEditSubscription.unsubscribe();
  }
}
