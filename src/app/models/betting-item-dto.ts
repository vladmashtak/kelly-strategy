import {generateUUID} from "../../utils/utils";

export class BettingItemDto {
  id: string;
  betType: string;
  betName: string;
  currentCoef: number;
  fairWinProb: number;
  fairCoef: number;
  kellyBetSize: number;
  resolved: boolean

  constructor(betType: string = "",
              betName: string = "",
              currentCoef: number = 0.0,
              fairWinProb: number = 0.0,
              fairCoef: number = 0.0,
              kellyBetSize: number = 0.0,
              resolved: boolean = false) {
    this.id = generateUUID()
    this.betType = betType;
    this.betName = betName;
    this.currentCoef = currentCoef;
    this.fairWinProb = fairWinProb;
    this.fairCoef = fairCoef;
    this.kellyBetSize = kellyBetSize;
    this.resolved = resolved;
  }
}
