import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BettingFormComponent } from './betting-form/betting-form.component';
import { BettingListComponent } from './betting-list/betting-list.component';
import { BettingItemComponent } from './betting-item/betting-item.component';
import {BettingService} from "./betting.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    BettingFormComponent,
    BettingListComponent,
    BettingItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BettingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
