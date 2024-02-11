import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any[], compareFn: (a: any, b: any) => number ): any[] {
    return value.sort(compareFn);
  }

}
