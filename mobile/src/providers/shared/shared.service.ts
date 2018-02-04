import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {  FilteredCafes } from '../../models/cafe.interface';


@Injectable()
export class DataService {
  private filteredCafesSource = new BehaviorSubject({});
  filteredCafesSubscriber = this.filteredCafesSource.asObservable();
  constructor() { }
  emitFilteredCafes(obj: FilteredCafes) {
    this.filteredCafesSource.next(obj);
  }
}