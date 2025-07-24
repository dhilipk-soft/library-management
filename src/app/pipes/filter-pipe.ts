import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchText: string, key: string): any[] {
    if(!value || !searchText) {
      return value;
    }

    searchText = searchText.toLowerCase();
    return value.filter(item => item[key].toLowerCase().includes(searchText));

  }

}
