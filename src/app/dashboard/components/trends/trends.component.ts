import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ratingsConst } from '../../constants/ratings.const';
import { GiphyRatings } from '../../enums/rating.enum';
import { Constants } from '../../models/constants.interface';
import { GiphyService } from '../../services/giphyservices.service';
import { TrendsAssist } from './trends.assist.class';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.scss']
})
export class TrendsComponent extends TrendsAssist implements OnInit, OnDestroy, AfterViewInit {
  @HostListener('window:scroll', ['events'])
  onScroll() {
    if (
      window.innerHeight + window.scrollY === document.body.scrollHeight && 
      !this.loading &&
      !this.isEnd
      ) {
      this.fetchTrends();
    }
  }
  rates: Constants<GiphyRatings, string>[] = ratingsConst;
  constructor(
    fb: FormBuilder,
    giphyService: GiphyService,
  ) {
    super(fb, giphyService);
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchTrends();
  }

  ngAfterViewInit(): void {
    this.startSubscribers();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
