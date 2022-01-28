import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GiphyService } from './services/giphyservices.service';
import { TrendsComponent } from './components/trends/trends.component';
import { SharedLibsModule } from '../shared-libs/shared-libs.module';
import { CardComponent } from './components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { GiphyRatingsPipe } from './pipes/giphy-ratings.pipe';
import { SearchComponent } from './components/search/search.component';
import { RenderStateService } from './services/render-state.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TrendsComponent,
    CardComponent,
    GiphyRatingsPipe,
    SearchComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    SharedLibsModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxFileDropModule,
  ],
  providers:[
    GiphyService,
    RenderStateService,
  ]
})
export class DashboardModule { }
