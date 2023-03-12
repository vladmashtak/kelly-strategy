import {Component, OnInit} from '@angular/core';
import {BettingItemDto} from "./models/betting-item-dto";
import {BettingService} from "./betting.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public currentBankRoll = 0
  public bettingList: Array<BettingItemDto> = []

  constructor(public bettingService: BettingService) {
    this.refreshData();
  }

  public ngOnInit(): void {
  }

  public getBettingItem(item: BettingItemDto): void {
    this.bettingService.setBettingItem(item);
    this.refreshData();
  }

  public updateBettingItem(item: BettingItemDto): void {
    this.bettingService.updateBettingItem(item);
    this.refreshData();
  }

  private refreshData(): void {
    this.bettingList = this.bettingService.getBettingItemList()
    this.currentBankRoll = this.bettingService.getCurrentBankRoll()
  }
}
