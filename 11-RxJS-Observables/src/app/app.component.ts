import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, interval, map, Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  buttonClick = signal(0);
  buttonClick$ = toObservable(this.buttonClick);
  // private destroyRef = inject(DestroyRef);

  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});

  customInterval$ = new Observable((Subscriber) => {
    Subscriber.error();
    let exections = 0;
    const interval = setInterval(() => {
      if(exections > 3){
        clearInterval(interval);
        Subscriber.complete();
        return;
      }
      console.log('Emitting new value...');
      Subscriber.next({message : 'New Value'});
      exections = exections+1;
    }, 2000)
  })

  constructor(){
    // effect(()=>{
    //     console.log(`Button Clicked ${this.buttonClick()} times.`);
    // })
  }

  ngOnInit(): void {
    //   const subscription = interval(1000)
    //     .pipe(map((val) => val * 2))
    //     .subscribe({
    //       next: (val) => console.log(val),
    //     });
    //   this.destroyRef.onDestroy(() => {
    //     subscription.unsubscribe();
    //   });

    // const subscription = this.buttonClick$.subscribe({
    //   next: (val) => console.log(`Button Clicked ${this.buttonClick()} times.`)
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });

    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Completed!') 
    })
  }

  onClick() {
    this.buttonClick.update((prevValue) => prevValue + 1);
  }
}
