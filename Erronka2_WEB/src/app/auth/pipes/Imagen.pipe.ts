import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Pipe({
  name: 'imagen',
  pure: false

})
export class ImagenPipePipe implements PipeTransform {

  transform(user: IUser): string {
    if(!user.argazkia) {
      return 'default/no-image.jpg';
    }else (user.argazkia)
      return user.argazkia;

  }
}
