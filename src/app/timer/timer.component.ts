import {Component, OnInit} from '@angular/core';
import {fromEvent, interval, merge, Observable} from 'rxjs';
import {exhaustMap, map, mapTo, scan, startWith, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }

  timer$: Observable<any> = new Observable<any>();

  ngOnInit(): void {
    const start$ = fromEvent(document.getElementById('start-btn'), 'click');
    const pause$ = fromEvent(document.getElementById('pause-btn'), 'click');
    const reset$ = fromEvent(document.getElementById('reset-btn'), 'click');

    this.timer$ = merge(
      start$.pipe(
        exhaustMap(() => interval(100).pipe(
          takeUntil(pause$),
          mapTo(1)
          )
        )
      ),
      reset$.pipe(
        mapTo(false)
      )).pipe(
        startWith(0),
        scan((acc, value) => !value ? 0 : acc += value),
    );
  }
}
