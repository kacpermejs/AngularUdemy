import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCounter, selectDoubleCounter } from '../store/counter.selectors';


@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
  standalone: true,
  imports: [AsyncPipe]
})
export class CounterOutputComponent {

  counter$: Observable<number>;
  doubleCounter$: Observable<number>;
  
  constructor(private store: Store<{counter: number}>) {
    this.counter$ = store.select(selectCounter);
    this.doubleCounter$ = store.select(selectDoubleCounter);
  }

}
