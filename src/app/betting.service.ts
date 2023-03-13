import {Injectable} from '@angular/core';
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

  public updateBettingItem(newItem: BettingItemDto): void {
    for (let i = 0; i < this.bettingItemList.length; i++) {
      let oldItem = this.bettingItemList[i];
      if (oldItem.id === newItem.id) {
        let storage = new LocalStorageDto();
        if (newItem.resolved) {
          let bankRoll = this.currentBankRoll + (newItem.kellyBetSize * newItem.currentCoef);
          this.currentBankRoll = bankRoll;
          storage.currentBankRoll = bankRoll;
        } else {
          let bankRoll = (this.currentBankRoll + oldItem.kellyBetSize) - newItem.kellyBetSize;
          this.currentBankRoll = bankRoll;
          storage.currentBankRoll = bankRoll;
        }

        let list = [...this.bettingItemList];
        list[i] = newItem;
        this.bettingItemList = list;
        storage.bettingItemList = list;

        localStorage.setItem(this.key, JSON.stringify(storage))
        return
      }
    }
  }

  public deleteBettingItem(item: BettingItemDto): void {
    for (let i = 0; i < this.bettingItemList.length; i++) {
      let oldItem = this.bettingItemList[i];
      if (oldItem.id === item.id) {
        let storage = new LocalStorageDto();

        if (!item.resolved) {
          this.currentBankRoll += oldItem.kellyBetSize
          storage.currentBankRoll = this.currentBankRoll;
        }

        let list = [...this.bettingItemList];
        list.splice(i, 1);
        this.bettingItemList = list;
        storage.bettingItemList = this.bettingItemList;

        localStorage.setItem(this.key, JSON.stringify(storage));
        return
      }
    }
  }
}
