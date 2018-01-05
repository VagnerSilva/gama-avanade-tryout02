import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class AppointmentsService {


  private _day: any;
  private _events: any;

  constructor(private http: HttpClient) { }

  // public async loadEventDay() {
  //   const event  = async () => {
  //     const res = await this.http.get<any>(`api/appointments`).toPromise();
  //     this.setEvent(res);
  //   };
  //   event();
  // }

  async loadEventDay(): Promise<any> {
    const response =  await this.http.get<any>(`api/appointments`).toPromise();
    return this.setEvent(response);
  }


  public setEvent(event) {
    return this._events = event;
  }

  public getEvent() {
    return this._events;
  }

  public setEventDay(date) {
    return this.http.post<any>(`api/appointments`, date);
  }


  getDay() {
    return this._day;
  }

  setDay(date) {
    this._day = date;
  }

}
