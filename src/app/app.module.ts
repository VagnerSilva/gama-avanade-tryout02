import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { AppointmentsSeed } from './appointments.seed';
import { CalendarComponent } from './calendar/calendar.component';
import { LeftComponent } from './calendar/left/left.component';
import { RightComponent } from './calendar/right/right.component';
import { AppointmentsService } from './calendar/services/appointments.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BroadcastService } from './calendar/services/broadcast.service';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LeftComponent,
    RightComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      AppointmentsSeed, { dataEncapsulation: false }
    )
  ],
  providers: [AppointmentsService, BroadcastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
