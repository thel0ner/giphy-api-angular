import { Component, Input, OnInit } from '@angular/core';
import { GiphyDataType } from 'src/app/dashboard/models/data.type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() data!: GiphyDataType;
  toggler = true;
  constructor() { }

  ngOnInit(): void {
  }

}
