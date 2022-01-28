import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RenderSectionsEnum } from './enums/render-sections.enum';
import { RenderStateService } from './services/render-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public renderEnums = RenderSectionsEnum;
  public state$!: Observable<RenderSectionsEnum>;
  constructor(
    private stateManager: RenderStateService
  ) { }

  ngOnInit(): void {
    this.state$ = this.stateManager.state as Observable<RenderSectionsEnum>;
  }

  changeState(state: RenderSectionsEnum): void {
    this.stateManager.state = state;
  }

  ngOnDestroy(): void {
    this.stateManager.destroy();
  }
}
