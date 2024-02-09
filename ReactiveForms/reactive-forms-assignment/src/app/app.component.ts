import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Observable, debounceTime, delay, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'reactive-forms-assignment';

  projectStatuses = ['Stable', 'Critical', 'Finished'];

  forbiddenProjectNames = ['Test'];
  
  form!: FormGroup;

  private mockService = {
    checkUsernameAvailability: (projectName: string) => {
      return of(projectName === 'Async').pipe(delay(2000));
    }
  };
  
  ngOnInit(): void {
    this.form = new FormGroup({
      projectName: new FormControl(
        '', 
        [
          Validators.required,
          this.forbiddenNames.bind(this)
        ],
        [
          this.validateProjectNameAsync()
        ]
      ),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email
        ]
      ),
      status: new FormControl(this.projectStatuses[0])
    });

    this.form.get('projectName')?.statusChanges.subscribe(s => console.log(s));
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  validateProjectNameAsync(): AsyncValidatorFn {
    return (control: AbstractControl):
      Observable<ValidationErrors | null> => {
        return of(control.value).pipe(
          debounceTime(300),
          switchMap(name => {
            return this.mockService.checkUsernameAvailability(name).pipe(
              map(isTaken => (isTaken ? { 'nameTaken': true } : null))
            );
          })
        );
      };
  }

  onSubmit() {
    console.log(this.form);
  }

}
