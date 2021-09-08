import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generoEs'
})
export class GeneroEsPipe implements PipeTransform {

  transform(value: string): string {
    
    const genero = (value: string): string => {
      if(value == 'Male'){
        return 'Hombre'
      } else {
        return 'Mujer'
      }
    }
    return genero(value);
  }

}
