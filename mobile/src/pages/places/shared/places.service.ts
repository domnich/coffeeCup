import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { API_URL } from '../../../app/constants';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class PlacesService {
  public _placesData = new BehaviorSubject({});
  constructor(
    private http: Http
  ) {
    console.log('Hello Places Provider');
  }

  getPlaces(obj) {
    const url = `${ API_URL }/house?startLat=${ obj.startLat }&endLat=${ obj.endLat }&startLng=${ obj.startLng }&endLng=${ obj.endLng }`;
    return this.http.get(url)
    .do(this.logResponse)
    .map(this.extractData)
    .catch(this.catchError)
    .subscribe(res => this._placesData.next(res));
    
  }

  getPlaceById(id: number) {
    const url = `${ API_URL }/house/${ id }`
    return this.http.get(url)
          .do(this.logResponse)
          .map(this.extractData)
          .catch(this.catchError);
  }

  public loadData(arr: Array<any>) {
    this._placesData.next(arr);
  }

  public get placesData(): Observable<any> {
    return this._placesData.asObservable();
}

  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server.error');
  }

  private logResponse(res: Response) {
    //console.log(res);
  }

  private extractData(res: Response) {
    return res.json();
  }
}

