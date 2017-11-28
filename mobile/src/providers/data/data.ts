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

        let coords = [{
            latitude: 49.993500,
            longitude: 36.230383
        }];


        let cafes = [{
            "id": 1,
            "name": "Mafia",
            "address": {
                "street": "ул. Рымарская",
                "suite": "д. 12",
                "city": "Харьков",
                "geo": {
                    "lat": "49.994091",
                    "lng": "36.238747"
                }
            }
        }, {
            "id": 2,
            "name": "Золотой Дукат",
            "address": {
                "street": "ул. Рымарская",
                "suite": "д. 12",
                "city": "Харьков",
                "geo": {
                    "lat": "50.021672",
                    "lng": "36.221924"
                }
            }
        }, {
            "id": 3,
            "name": "Kofein",
            "address": {
                "street": "ул. Рымарская",
                "suite": "д. 12",
                "city": "Харьков",
                "geo": {
                    "lat": "50.012628",
                    "lng": "36.241493"
                }
            }
        },
            {
                "id": 4,
                "name": "Имбирный пряник",
                "address": {
                    "street": "ул. Рымарская",
                    "suite": "д. 12",
                    "city": "Харьков",
                    "geo": {
                        "lat": "49.982834",
                        "lng": "36.194458"
                    }
                }
            }, {
                "id": 5,
                "name": "Кофейный Гурман",
                "address": {
                    "street": "ул. Рымарская",
                    "suite": "д. 12",
                    "city": "Харьков",
                    "geo": {
                        "lat": "49.981951",
                        "lng": "36.255913"
                    }
                }
            }, {
                "id": 6,
                "name": "Seven Coffee Seeds",
                "address": {
                    "street": "ул. Рымарская",
                    "suite": "д. 12",
                    "city": "Харьков",
                    "geo": {
                        "lat": "49.999388",
                        "lng": "36.285095"
                    }
                }
            },{
                "id": 7,
                "name": "FamilyCoffee",
                "address": {
                    "street": "ул. Рымарская",
                    "suite": "д. 12",
                    "city": "Харьков",
                    "geo": {
                        "lat": "49.998285",
                        "lng": "36.223297"
                    }
                }
            },{
                "id": 8,
                "name": "Sweeter",
                "address": {
                    "street": "ул. Рымарская",
                    "suite": "д. 12",
                    "city": "Харьков",
                    "geo": {
                        "lat": "49.957219",
                        "lng": "36.338654"
                    }
                }
            }];


        return this.http.get(`${this.rootUrl}/${this.posts}`)
            .map(res => cafes).take(1)
            .subscribe(res => this._settings.next(res));
    }

    getPostById(id: number) {
        return this.http.get(`${this.rootUrl}/${this.posts}/${id}`).map(res => res.json()).take(1);
    }

    public get Settings(): Observable<any> {
        return this._settings.asObservable();
    }
}
