import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BettingItemDto} from "../models/betting-item-dto";

@Component({
  selector: 'app-betting-form',
  templateUrl: './betting-form.component.html',
  styleUrls: ['./betting-form.component.scss']
})
export class BettingFormComponent implements OnInit {

  @Input("current-bank-roll")
  public currentBankRoll: number = 0

  @Output("get-betting-item")
  public getBettingItem: EventEmitter<BettingItemDto> = new EventEmitter<BettingItemDto>()

  public bettingForm = this.fb.group({
    name: ['', Validators.required],
    betType: ['', Validators.required],
    firstSubEvent: this.fb.group({
      currentCoef: [null, Validators.required],
      fairCoef: [{value: null, disabled: true}],
      fairWinProb: [{value: null, disabled: true}],
      kellyBetSize: [{value: null, disabled: true}]
    }),
    secondSubEvent: this.fb.group({
      currentCoef: [null, Validators.required],
      fairCoef: [{value: null, disabled: true}],
      fairWinProb: [{value: null, disabled: true}],
      kellyBetSize: [{value: null, disabled: true}]
    }),
  });

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    let firstSubEvent = this.bettingForm.get('firstSubEvent')
    if (!!firstSubEvent) {
      let firstCurrentCoef = firstSubEvent.get('currentCoef')
      if (!!firstCurrentCoef) {
        firstCurrentCoef.valueChanges.subscribe(val => {
          this.calculateBet()
        });
      }
    }

    let secondSubEvent = this.bettingForm.get('secondSubEvent')
    if (!!secondSubEvent) {
      let secondCurrentCoef = secondSubEvent.get('currentCoef')
      if (!!secondCurrentCoef) {
        secondCurrentCoef.valueChanges.subscribe(val => {
          this.calculateBet()
        });
      }
    }
  }

  public calculateBet() {
    // let firstSubEvent = this.bettingForm.get('firstSubEvent')
    // let secondSubEvent = this.bettingForm.get('secondSubEvent')

    let value = this.bettingForm.getRawValue();
    let firstWinProb = 0
    let secondWinProb = 0

    if (!!value.firstSubEvent.currentCoef) {
      firstWinProb = 1/value.firstSubEvent.currentCoef
    }

    if (!!value.secondSubEvent.currentCoef) {
      secondWinProb = 1/value.secondSubEvent.currentCoef
    }

    if (!!firstWinProb && !!secondWinProb) {
      let fairWinProb_1 = firstWinProb / (firstWinProb + secondWinProb)
      let fairWinProb_2 = secondWinProb / (firstWinProb + secondWinProb)

      let kellyCriteria = this.getKellyCriterion(fairWinProb_1, fairWinProb_2);

      this.bettingForm.patchValue({
        firstSubEvent: {
          // @ts-ignore
          fairWinProb: fairWinProb_1,
          // @ts-ignore
          fairCoef: 1/fairWinProb_1,
          // @ts-ignore
          kellyBetSize: this.currentBankRoll*kellyCriteria
        },
        secondSubEvent: {
          // @ts-ignore
          fairWinProb: fairWinProb_2,
          // @ts-ignore
          fairCoef: 1/fairWinProb_2,
          // @ts-ignore
          kellyBetSize: this.currentBankRoll*kellyCriteria
        }
      })
    }
  }

  public saveBettingItem(): void {
    if (!this.bettingForm.valid) {
      return
    }

    let val = this.bettingForm.getRawValue()

    // @ts-ignore
    let event = val.firstSubEvent.fairWinProb > val.secondSubEvent.fairWinProb ? val.firstSubEvent : val.secondSubEvent

    // @ts-ignore
    let data = new BettingItemDto(val.betType,
      val.name, event.currentCoef, event.fairWinProb, event.fairCoef, event.kellyBetSize);

    this.getBettingItem.emit(data)
    this.bettingForm.reset()
  }

  private getKellyCriterion(winProb1: number, winProb2: number): number {
    // IF(D20<D21;(D21-((1-D21)/1))/10;(D20-((1-D20)/1))/10)
    if (winProb1<winProb2) {
      return (winProb2-((1-winProb2)/1))/10
    } else {
      return (winProb1-((1-winProb1)/1))/10
    }
  }
}
