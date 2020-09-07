import { Pipe, ChangeDetectorRef } from '@angular/core';
import { parse, distanceInWordsToNow } from 'date-fns';
import { AsyncPipe } from '@angular/common';
import { timer, Observable } from 'rxjs';
import { tap, map, distinctUntilChanged, startWith } from 'rxjs/operators';

//"date-fns": "^1.30.1",
@Pipe({
  name: 'timeAgo',
  pure: false,
})
export class TimeAgoPipe extends AsyncPipe {

  private time: Date;
  private formatted$: Observable<string>;

  constructor(private cd: ChangeDetectorRef) {
    super(cd);

    this.formatted$ = timer(0, 1000).pipe(
      map(() => distanceInWordsToNow(this.time, { addSuffix: true, includeSeconds: true })),
      distinctUntilChanged(),
      tap(time => console.log('new time:', time)),
    );
  }

  public transform(value: any): any {
    this.time = parse(value);
    return super.transform(this.formatted$);
  }

}