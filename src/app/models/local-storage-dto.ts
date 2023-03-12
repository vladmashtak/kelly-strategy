import {BettingItemDto} from "./betting-item-dto";

export class LocalStorageDto {
  public currentBankRoll: number = 0;
  public bettingItemList: Array<BettingItemDto> = []
}
