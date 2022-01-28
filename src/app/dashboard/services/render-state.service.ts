import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RenderSectionsEnum } from '../enums/render-sections.enum';

@Injectable()
export class RenderStateService {
  private store: BehaviorSubject<RenderSectionsEnum> = new BehaviorSubject<RenderSectionsEnum>(RenderSectionsEnum.trends);
  constructor() { }

  get state(): Observable<RenderSectionsEnum> | RenderSectionsEnum {
    return this.store.asObservable();
  }

  set state(inpt: RenderSectionsEnum | Observable<RenderSectionsEnum>) {
    this.store.next(inpt as RenderSectionsEnum);
  }

  public destroy(): void{
    this.store.complete();
  }
}
