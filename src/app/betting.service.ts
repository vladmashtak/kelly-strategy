import { Injectable } from '@angular/core';
import {BettingItemDto} from "./models/betting-item-dto";
import {LocalStorageDto} from "./models/local-storage-dto";

@Injectable({
  providedIn: 'root'
})
export class BettingService {
  private key: string = 'kellyBetting';
  private currentBankRoll: number = 2000
  private bettingItemList: Array<BettingItemDto> = [];
  constructor() {
    const bettingItemList = localStorage.getItem(this.key);
    if (!!bettingItemList) {
      let storage: LocalStorageDto = JSON.parse(bettingItemList);
      if (!!storage) {
        this.bettingItemList = storage.bettingItemList;
        this.currentBankRoll = storage.currentBankRoll
      }
    }
  }

  public setBettingItem(item: BettingItemDto): void {
    let storage = new LocalStorageDto();

    let list = [item, ...this.bettingItemList];
    this.bettingItemList = list;
    storage.bettingItemList = list;

    if (!item.resolved) {
      let bankRoll = this.currentBankRoll - item.kellyBetSize;
      this.currentBankRoll = bankRoll;
      storage.currentBankRoll = bankRoll
    }

    localStorage.setItem(this.key, JSON.stringify(storage))
  }

  public getBettingItemList(): Array<BettingItemDto> {
    return [...this.bettingItemList]
  }

  public getCurrentBankRoll(): number {
    return this.currentBankRoll
  }

  public updateBettingItem(item: BettingItemDto): void {
    for (let i = 0; i < this.bettingItemList.length; i++) {
      if (this.bettingItemList[i].id === item.id) {
        let storage = new LocalStorageDto();

        let list = [...this.bettingItemList]
        list[i] = item
        this.bettingItemList = list
        storage.bettingItemList = list

        if (item.resolved) {
          let bankRoll = this.currentBankRoll + (item.kellyBetSize * item.currentCoef);
          this.currentBankRoll = bankRoll
          storage.currentBankRoll = bankRoll
        }

        localStorage.setItem(this.key, JSON.stringify(storage))
        return
      }
    }
  }

}
