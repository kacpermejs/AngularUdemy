import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  sub: Subscription;

  constructor() { }
  
  ngOnInit() {
    // this.sub = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    if (false) {
      //old way, passing 3 lambdas
      this.sub = customIntervalObservable.subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log('Completed!');
        }
      );
    }

    //new way, passing 1 object with 3 lambdas
    this.sub = customIntervalObservable.subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
        alert(error.message);
      },
      complete : () => {
        console.log('Completed!');
      }
    });
  
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
