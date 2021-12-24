import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ClockInComponent} from "./components/clock-in/clock-in.component";
import {FormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";

@NgModule({
  declarations: [AppComponent, ClockInComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NzInputModule, NzButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
