import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: User[] | undefined, searchText:string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.firstName?.toLocaleLowerCase().startsWith(searchText) 
      || it.lastName?.toLocaleLowerCase().startsWith(searchText) ;
      
    });
  }

}
