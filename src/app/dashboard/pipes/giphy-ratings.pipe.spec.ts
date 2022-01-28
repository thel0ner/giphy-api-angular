import { GiphyRatings } from '../enums/rating.enum';
import { GiphyRatingsPipe } from './giphy-ratings.pipe';

describe('GiphyRatingsPipe', () => {
  it('create an instance', () => {
    const pipe = new GiphyRatingsPipe();
    expect(pipe).toBeTruthy();
  });
  it('should detect level 1', () => {
    const pipe = new GiphyRatingsPipe();
    const response = pipe.transform(GiphyRatings.g);
    expect(response).toContain('Level 1');
  });

  it('should detect return undefined', () => {
    const pipe = new GiphyRatingsPipe();
    const response = pipe.transform(100);
    expect(response).toBeUndefined();
  });
});
