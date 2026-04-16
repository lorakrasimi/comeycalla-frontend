import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readingTime',
})
export class ReadingTimePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
