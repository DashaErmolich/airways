/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightsUpdateService {
  public isUpdate$ = new BehaviorSubject<boolean>(true);

  setIsUpdate(value: boolean) {
    this.isUpdate$.next(value);
  }
}
