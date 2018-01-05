import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AppointmentsService } from '../services/appointments.service';


import * as moment from 'moment';
import { BroadcastService } from '../services/broadcast.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ca-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {

  [index: string]: any;

  private event_form: FormGroup;
  public title: FormControl;

  constructor(
    public calendarService: AppointmentsService,
    private onEvent: BroadcastService
  ) {
    this.getDay();
   }

  ngOnInit() {
    this.getDay();
    this.getEvent();
    this.createFormControls();
    this.createForm();
  }


  createFormControls() {
    this.title = new FormControl('', Validators.required);
  }


  createForm() {
    this.event_form = new FormGroup({
      title: this.title,
    });
  }



  getDay() {

    let day;
    this.calendarService.getDay() ?
     day = this.calendarService.getDay().mDate :
     day = this.calendarService.getDay();
    return day || this.calendarService.getDay();

  }


  getEvent() {
    return this.calendarService.getEvent();
  }

  setEvent() {

    const event = this.calendarService.getEvent();

    event.push({
      id: 10,
      title: this.title.value,
      date: moment(this.getDay()).format('YYYY-MM-DD')
    });

    this.calendarService.setEventDay(event);
    this.event_form.reset();
    this.event_form.markAsTouched();
    this.onEvent.broadcast('updateEvent');

  }




}
