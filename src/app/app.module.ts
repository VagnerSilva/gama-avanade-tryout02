import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { AppointmentsSeed }  from './appointments.seed';
import { CalendarComponent } from './calendar/calendar.component';
import { LeftComponent } from './calendar/left/left.component';
import { RightComponent } from './calendar/right/right.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LeftComponent,
    RightComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      AppointmentsSeed, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
