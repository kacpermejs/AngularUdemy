import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log('editMode: ', this.editMode);
    });
    this.activatedRoute.data.subscribe(data => {
      console.log('data: ', data);
    });
  }



}
