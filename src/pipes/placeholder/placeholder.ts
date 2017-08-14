import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, defecto:string = "Titulo") {
    return(value) ? value: defecto;
  }
}
