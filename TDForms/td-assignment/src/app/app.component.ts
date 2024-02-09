import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

interface MyForm {
  email: string;
  subscription: string;
  password: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'td-assignment';

  @ViewChild('f', { static: false }) form!: NgForm;

  submitted?: MyForm;

  onSubmit() {
    if (this.form.valid) {
      this.submitted = this.form.value;
      console.log(this.form.value);
    }
  }
}
