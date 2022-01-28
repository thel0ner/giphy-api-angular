import { TestBed } from '@angular/core/testing';

import { RenderStateService } from './render-state.service';

describe('RenderStateService', () => {
  let service: RenderStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        RenderStateService
      ]
    });
    service = TestBed.inject(RenderStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
