import { Pipe, PipeTransform } from '@angular/core';
import { ratingsConst } from '../constants/ratings.const';

@Pipe({
  name: 'giphyRatings'
})
export class GiphyRatingsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return ratingsConst.find(item => item.id === value)?.data;
  }

}
