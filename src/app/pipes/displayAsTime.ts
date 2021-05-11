import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'displayAsTime'
})

export class DisplayAsTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return this.toTimeString(minutes) + ':' + this.toTimeString(value - minutes * 60);
  }

  private toTimeString(val: number): string {
    return val.toLocaleString(
      'en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }
    );
  }
}
