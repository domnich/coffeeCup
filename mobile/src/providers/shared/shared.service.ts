import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Cafe } from '../../models/cafe.interface';

@Injectable()
export class DataService {
  private filteredCafesSource = new BehaviorSubject<Array<Cafe>>([]);
  filteredCafesSubscriber = this.filteredCafesSource.asObservable();
  constructor() { }
  emitFilteredCafes(cafes: Cafe[]) {
    this.filteredCafesSource.next(cafes);
  }
}