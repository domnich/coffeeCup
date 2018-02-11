import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {  FilteredCafes } from '../../models/cafe.interface';


@Injectable()
export class DataService {
  private filteredCafesSource = new BehaviorSubject({});
  private userCoordinatesSource = new BehaviorSubject({});
  private userProfileSource = new BehaviorSubject({});
  filteredCafesSubscriber = this.filteredCafesSource.asObservable();
  userCoordinatesSubscriber = this.userCoordinatesSource.asObservable();
  userProfileSubscriber = this.userProfileSource.asObservable();
  constructor() { }
  emitFilteredCafes(obj: FilteredCafes) {
    this.filteredCafesSource.next(obj);
  }
  emitUserCoordinates(obj: {latitude: string | number, longitude: string | number}) {
    this.userCoordinatesSource.next(obj);
  }
  emitUserProfile(obj: any) {
    this.userProfileSource.next(obj);
  }
}