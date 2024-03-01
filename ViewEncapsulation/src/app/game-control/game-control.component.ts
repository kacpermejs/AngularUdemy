import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  standalone: true,
  imports: [],
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent {
  @Output() intervalEvent = new EventEmitter<number>();
  interval: any = null;
  lastNumber = 0;

  onGameStart() {
    if(this.interval)
      return;
    
    this.interval = setInterval(() => {
      this.intervalEvent.emit(this.lastNumber + 1);
      this.lastNumber++;
    }, 1000);
  }

  onGameStop() {
    clearInterval(this.interval);
    this.interval = null;
  }
}
