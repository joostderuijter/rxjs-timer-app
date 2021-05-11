import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import {DisplayAsTimePipe} from './pipes/displayAsTime';

@NgModule({
    declarations: [
        AppComponent,
        TimerComponent,
        DisplayAsTimePipe
    ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
