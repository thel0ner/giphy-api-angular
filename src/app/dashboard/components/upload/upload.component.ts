import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { GiphyService } from '../../services/giphyservices.service';
import { UploadAssistant } from './upload.assist.class';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent extends UploadAssistant implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    giphyServices: GiphyService,
  ) {
    super(giphyServices);
  }

  ngOnInit(): void {
    this.init();
  }

  ngAfterViewInit(): void {
    this.subscribers();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
