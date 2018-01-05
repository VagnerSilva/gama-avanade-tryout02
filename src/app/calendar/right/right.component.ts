import { Component, OnInit, Input } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';
import { AppointmentsService } from '../services/appointments.service';
import { BroadcastService } from '../services/broadcast.service';

export interface CalendarDate {
  mDate: moment.Moment;
  hasevent?: any;
  today?: boolean;
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ca-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent implements OnInit {


  private _days: String[];
  private _defaultDate: moment.MomentInput = moment('18-12-2017', 'DD-MM-YYYY');

  private _currentDate: moment.MomentInput = this._defaultDate;

  private _weeks: CalendarDate[][] = [];

  private _monthYear: any;

  private _sortedDates: CalendarDate[] = [];

  @Input() selectedDates: CalendarDate[] = [];


  constructor(
    public calendarService: AppointmentsService,
    private onEvent: BroadcastService
  ) {
    this.calendarService.setDay(this._defaultDate);
  }

 async ngOnInit() {


    let value;
    // getters and setters monthYear
    Object.defineProperty(this, '_monthYear', {
      get: function () { return this.getMonthYear(this._currentDate); },
      set: function (newValue) { value = this.getMonthYear(newValue); },
      enumerable: true,
      configurable: true
    });

    // load calendar
    await this.calendarService.loadEventDay();
    this.generateCalendar();
    this.updateEvents();
  }





  /**
   * @param  {string} locale? - Optional - Language
   * @returns String
   */
  public weekdayName(): String[] {
    //    moment.locale(locale || 'en');
    const __weekdays = moment.weekdays(true)
      .map(function (days) {
        return days.slice(0, 3).toUpperCase();
      });
    return __weekdays;
  }

  public prevMonth(): void {
    this._currentDate = moment(this._currentDate).subtract(1, 'months');
    this._monthYear = this._currentDate;
    this.calendarService.setDay(this._currentDate);
    this.generateCalendar();
  }
  public nextMonth(): void {
    this._currentDate = moment(this._currentDate).add(1, 'months');
    this._monthYear = this._currentDate;
    this.calendarService.setDay(this._currentDate);
    this.generateCalendar();
  }



  public isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this._currentDate, 'month');
  }

  public selectDateIs(date: moment.Moment): boolean {
    return moment(this._currentDate).isSame(moment(date), 'day');
  }

  public isSelected(date: moment.Moment) {
    let select;

    const events: Array<any> = this.calendarService.getEvent();

   events.forEach(selectedDate => {
      if (moment(date).isSame(selectedDate.date, 'day')) {
        select = selectedDate;
      }
    });

    return select;
  }

  public selectDate(date: CalendarDate): void {

    this._currentDate = moment(date.mDate);
    this.calendarService.setDay(date);
    this.onEvent.broadcast('updateEvent');
  }

  public getMonthYear(currentDate) {
    return moment(currentDate, 'DD-MM-YYYY').format('MMMM/YY');
  }

  // reference in http://www.bentedder.com/create-calendar-grid-component-angular-4/
  public generateCalendar(): void {
    const firstOfMonth = moment(this._currentDate)
      .startOf('month')
      .day();
    const firstDayOfGrid = moment(this._currentDate)
      .startOf('month')
      .subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();

    // return list of days
    const dates = _.range(start, start + 42)
      .map((date: number) => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          mDate: d,
          hasevent: this.isSelected(d),
          selectDate: this.selectDateIs(d)
        };
      });

    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }

    this._weeks = weeks;
  }

  updateEvents() {
    this.onEvent.on('updateEvent').subscribe(() => {
      this.generateCalendar();
    });
  }



}
