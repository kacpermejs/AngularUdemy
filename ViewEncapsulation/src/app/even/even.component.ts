import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  standalone: true,
  imports: [],
  templateUrl: './even.component.html',
  styles: `
    p {
      background-color: rgb(148, 255, 121);
      padding: 10px;
      margin: 10px;
    }
  ` 
})
export class EvenComponent {
  @Input() number?: number;
}
