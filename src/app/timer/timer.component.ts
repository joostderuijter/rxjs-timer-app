import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, interval, Observable, pipe} from 'rxjs';
import {exhaustMap, map, mergeMap, scan, skip, skipUntil, takeUntil, tap, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  public timer$ = new BehaviorSubject<number>(0);

  constructor() { }

  ngOnInit(): void {
    const start$ = fromEvent(document.getElementById('start-btn'), 'click');
    const pause$ = fromEvent(document.getElementById('pause-btn'), 'click');
    const reset$ = fromEvent(document.getElementById('reset-btn'), 'click');

    start$.pipe(
      exhaustMap(() => interval(100).pipe(
          takeUntil(pause$),
          withLatestFrom(this.timer$),
          map(([first, second]) => second),
          scan(((acc) => acc + 1)),
        )
      ),
      tap((val) => this.timer$.next(val))
    ).subscribe(console.log);

    reset$.pipe(
      map(() => 0),
      tap((val) => this.timer$.next(val))
    ).subscribe();
  }
}
