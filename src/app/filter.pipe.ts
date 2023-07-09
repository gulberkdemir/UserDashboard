import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args.toLocaleLowerCase()) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal =
        (val.firstName.toLocaleLowerCase().includes(args.toLocaleLowerCase())) ||
        (val.lastName.toLocaleLowerCase().includes(args.toLocaleLowerCase()));
      return rVal;
    })

  }

}
