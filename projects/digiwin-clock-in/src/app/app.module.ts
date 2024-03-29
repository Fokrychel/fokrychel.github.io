import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockInComponent } from './components/clock-in/clock-in.component';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClientModule } from '@angular/common/http';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [AppComponent, ClockInComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
