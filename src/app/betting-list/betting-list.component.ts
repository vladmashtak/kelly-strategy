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

  @Output("disabled-betting-item")
  public disabledBettingItem: EventEmitter<BettingItemDto> = new EventEmitter<BettingItemDto>()

  @Output("delete-betting-item")
  public deleteBettingItem: EventEmitter<BettingItemDto> = new EventEmitter<BettingItemDto>()

  @Output("edit-betting-item")
  public editBettingItem: EventEmitter<BettingItemDto> = new EventEmitter<BettingItemDto>()


  public resolve(bet: BettingItemDto): void {
    if (!bet.resolved && !bet.disabled) {
      bet.resolved = true;
      this.resolveBettingItem.emit({...bet});
    }
  }

  public disabled(bet: BettingItemDto): void {
    if (!bet.resolved && !bet.disabled) {
      bet.disabled = true;
      this.disabledBettingItem.emit({...bet});
    }
  }

  public delete(bet: BettingItemDto): void {
    if (!bet.resolved) {
      this.deleteBettingItem.emit(bet)
    }
  }

  public edit(bet: BettingItemDto): void {
    if (!bet.resolved) {
      this.editBettingItem.emit(bet)
    }
  }
}
