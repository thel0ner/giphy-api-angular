import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../../models/constants.interface';
import { GiphyService } from '../../services/giphyservices.service';
import { SearchAssistant } from './search.assistant.class';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends SearchAssistant implements OnInit, OnDestroy {
  @HostListener('window:scroll', ['events'])
  onScroll() {
    if (
      window.innerHeight + window.scrollY === document.body.scrollHeight && 
      !this.loading
      && this.queryBackup.length > 0 && this.offset > 0
      ) {
      this.fetchResults(this.queryBackup,this.offset,true);
    }
  }
  constructor(
    giphyService: GiphyService,
  ) {
    super(giphyService);
  }

  ngOnInit(): void {
    this.autoComplete();
  }

  search($event: Constants<number, string>) {
    this.offset = 0;
    if ($event === undefined) {
      this.searchResult.data = [];
      this.queryBackup = '';
      return;
    }
    this.queryBackup = $event.data;
    this.fetchResults($event.data);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
