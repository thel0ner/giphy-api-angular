import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { arrBytes } from './arraybytesfortest';

import { GiphyService } from './giphyservices.service';

describe('GiphyService', () => {
  let service: GiphyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        GiphyService,
      ]
    });
    service = TestBed.inject(GiphyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get 12 trends', (done: DoneFn) => {
    service.getTrends({
      limit: 12,
      offset: 0,
    }).subscribe(
      next => {
        expect(next.data.length).toEqual(12);
        done();
      }
    )
  });
  it('should provide suggestions for auto complete with keyword of test', (done: DoneFn) => {
    service.autoComplete('test').subscribe(
      next => {
        expect(next.data.length).toBeGreaterThan(0);
        done();
      }
    );
  });
  it('should search for `test` keyword', (done: DoneFn) => {
    service.search('test').subscribe(
      next => {
        expect(next.data.length).toBeGreaterThan(0);
        done();
      }
    );
  });
  it('it should provide next results of `test` keyword, used for lazy loading on scrolling', (done: DoneFn) => {
    service.search('test', 12).subscribe(
      next => {
        expect(next.pagination.offset).toBe(12);
        done();
      }
    );
  });

  it('should be able to load a already uploaded gif by id of : `N99sP1ncb24SClFMwq`', (done: DoneFn) => {
    service.getFileById('N99sP1ncb24SClFMwq').subscribe(
      next => {
        expect(next.data.id).toContain('N99sP1ncb24SClFMwq');
        done();
      }
    );
  });
});
