import {Injectable} from '@angular/core';
import {BettingItemDto} from "./models/betting-item-dto";
import {LocalStorageDto} from "./models/local-storage-dto";

/*
{"currentBankRoll":1810.1904427235108,"bettingItemList":[{"id":"c31d7b54-fa7a-4a90-82bb-ef555039c182","betType":"тотал больше 1.5","betName":"Наполі 15 БЕР | 22:00 overlay Айнтрахт","currentCoef":1.24,"fairWinProb":0.7677902621722846,"fairCoef":1.302439024390244,"kellyBetSize":95.7196058297617,"resolved":false},{"id":"b5ea6f2b-3885-4197-90fd-f2f60b92466c","betType":"тотал больше 2.5","betName":"Реал Мадрид 15 БЕР | 22:00 overlay Ліверпуль","currentCoef":1.58,"fairWinProb":0.6079404466501241,"fairCoef":1.6448979591836732,"kellyBetSize":39.433797414193094,"resolved":false},{"id":"78614fa4-ab79-445f-9737-46afb08e5445","betType":"тотал меньше 3.5","betName":"Ман Сіті 14 БЕР | 22:00 overlay Лейпциг","currentCoef":1.52,"fairWinProb":0.633734939759036,"fairCoef":1.5779467680608368,"kellyBetSize":50.19997722575855,"resolved":false},{"id":"231719b1-accb-478c-8f95-d0def6154935","betType":"татол меньше 3.5","betName":"Порту 14 БЕР | 22:00 overlay Інтер","currentCoef":1.3,"fairWinProb":0.7319587628865979,"fairCoef":1.3661971830985917,"kellyBetSize":91.3060213967413,"resolved":true},{"id":"9402b9bd-dca7-412a-bc70-6eb4c2d1da43","betType":"тотал больше 1.5","betName":"Арсенал Спортинг","currentCoef":1.22,"fairWinProb":0.7749077490774907,"fairCoef":1.2904761904761906,"kellyBetSize":114.50786821528935,"resolved":false},{"id":"a51f9c33-8834-4d91-8296-5c645dd6b56d","betType":"тотал меньше 3.5","betName":"Мілан Салернітана","currentCoef":1.52,"fairWinProb":0.6328502415458938,"fairCoef":1.580152671755725,"kellyBetSize":51.306941406245095,"resolved":true},{"id":"7dcf890f-7687-43dd-947a-0022ad62329c","betType":"тотал меньше 3.5","betName":" Жирона  Атлетіко М","currentCoef":1.29,"fairWinProb":0.7388663967611336,"fairCoef":1.3534246575342466,"kellyBetSize":96.87873769240434,"resolved":true},{"id":"1bf70932-6a57-4bc5-9ede-76f8a16db149","betType":"тотал меньше 3.5","betName":"Спортінг Л.  Боавішта","currentCoef":1.46,"fairWinProb":0.6515513126491647,"fairCoef":1.534798534798535,"kellyBetSize":60.620525059665866,"resolved":true}]}
*/

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
        } else if (!newItem.disabled && !newItem.resolved) {
          let bankRoll = (this.currentBankRoll + oldItem.kellyBetSize) - newItem.kellyBetSize;
          this.currentBankRoll = bankRoll;
          storage.currentBankRoll = bankRoll;
        } else {
          storage.currentBankRoll = this.currentBankRoll
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
