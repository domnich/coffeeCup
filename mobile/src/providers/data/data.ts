import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable()
export class DataProvider {
    private _settings = new BehaviorSubject({});
    rootUrl: string = 'https://jsonplaceholder.typicode.com';
    posts: string = 'posts';

    constructor(public http: Http) {
        console.log('Hello DataProvider Provider');
    }

    getPosts() {
        return this.http.get(`${this.rootUrl}/${this.posts}`)
            .map(res => res.json()).take(1)
            .subscribe(res => this._settings.next(res));
    }

    getPostById(id: number) {
        return this.http.get(`${this.rootUrl}/${this.posts}/${id}`).map(res => res.json()).take(1);
    }

    public get Settings(): Observable<any> {
        return this._settings.asObservable();
    }
}
