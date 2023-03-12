import {Component, Input} from '@angular/core';
import {BettingItemDto} from "../models/betting-item-dto";

@Component({
  selector: 'app-betting-item',
  templateUrl: './betting-item.component.html',
  styleUrls: ['./betting-item.component.scss']
})
export class BettingItemComponent {
  @Input("index")
  index: number = 0

  @Input("betting-item")
  bettingItem: BettingItemDto = new BettingItemDto()
}
