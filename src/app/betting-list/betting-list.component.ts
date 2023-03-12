import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BettingItemDto} from "../models/betting-item-dto";


@Component({
  selector: 'app-betting-list',
  templateUrl: './betting-list.component.html',
  styleUrls: ['./betting-list.component.scss']
})
export class BettingListComponent {
  @Input("betting-list")
  public bettingList: Array<BettingItemDto> = [];

  @Output("resolve-betting-item")
  public resolveBettingItem: EventEmitter<BettingItemDto> = new EventEmitter<BettingItemDto>()

  public resolve(bet: BettingItemDto): void {
    if (!bet.resolved) {
      bet.resolved = true;
      this.resolveBettingItem.emit({...bet});
    }
  }
}
