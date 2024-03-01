import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GameControlComponent } from './game-control/game-control.component';
import { EvenComponent } from './even/even.component';
import { OddComponent } from './odd/odd.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GameControlComponent, EvenComponent, OddComponent, InactiveUsersComponent, ActiveUsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ViewEncapsulation';
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onNumberIntervalFired(event: number) {
    if (event % 2 == 0) {
      this.evenNumbers.push(event);
    } else {
      this.oddNumbers.push(event);
    }
  }

  //services assignment: 
  

  
}
