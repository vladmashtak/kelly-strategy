import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BettingItemDto} from "./models/betting-item-dto";
import {BettingService} from "./betting.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @ts-ignore
  public editItem:BettingItemDto = null
  public currentBankRoll = 0
  public bettingList: Array<BettingItemDto> = []

  constructor(public bettingService: BettingService) {
    this.refreshData();
  }

  public ngOnInit(): void {
  }

  public saveBettingItem(item: BettingItemDto): void {
    if (!!this.editItem && this.editItem.id === item.id) {
      // @ts-ignore
      this.editItem = null;
      this.updateBettingItem(item)
    } else {
      this.bettingService.setBettingItem(item);
      this.refreshData();
    }
  }

  public updateBettingItem(item: BettingItemDto): void {
    this.bettingService.updateBettingItem(item);
    this.refreshData();
  }

  public deleteBettingItem(item: BettingItemDto): void {
    this.bettingService.deleteBettingItem(item);
    this.refreshData();
  }

  public editBettingItem(item: BettingItemDto): void {
    this.editItem = {...item};
    this.refreshData();
  }

  private refreshData(): void {
    this.bettingList = this.bettingService.getBettingItemList()
    this.currentBankRoll = this.bettingService.getCurrentBankRoll()
  }
}
