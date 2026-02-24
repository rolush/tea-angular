import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productDescription'
})

export class ProductDescriptionPipe implements PipeTransform {

  transform(value: string, limit: number = 160): string {
    if (value.length > limit) {
      value = value.substring(0, limit) + '...';
    }

    return value;
  }

}
