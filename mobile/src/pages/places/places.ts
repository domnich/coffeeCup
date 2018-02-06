import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { CafeListTab, MapTab } from '../pages';
import { Observable } from "rxjs/Observable";
import { Cafe } from "../../models/cafe.interface";
import { PlacesService } from './shared/places.service';
import { Cancellable } from '../../app/services/cancellable';
import { LocalStorage } from '../../app/services/localstorage';
import { getDistanceFromLatLonInKm, compareDistance } from '../../app/helpers';

@IonicPage()
@Component({
    selector: 'places',
    templateUrl: 'places.html',
})
export class PlacesPage extends Cancellable implements OnDestroy {
    @ViewChild('tabs') tabRef: Tabs;
    tab1Root: any = CafeListTab;
    tab2Root: any = MapTab;
    places: Observable<Array<Cafe>>;
    text: string;
    updateFromServer: boolean;
    getDistance = getDistanceFromLatLonInKm;
    compareDistance = compareDistance;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private placesService: PlacesService,
        private localStorage: LocalStorage
    ) {
        super();
        this.getPlaces();

        this.addSubscriptionToStack(this.placesService.placesData.subscribe(res => {
            if (res && res.length) {
                if(this.updateFromServer) {
                    this.saveToStorage(res);        
                }
                this.places = res;
            }
        })); 
    }

    ionViewDidLoad() {
        this.tabRef.select(0);
    }

    ngOnDestroy() {
        this.cancelSubscriptions();
        this.cancelRequests();
    }

    getPlaces() {
        this.localStorage.getCafesFromStorage().then((res) => {
            if(res === null) {
                this.updateFromServer = true;
                this.loadData();
            } else {
                this.updateFromServer = false;
                let test = [
                    {
                        "id": "1",
                        "name": "Zolotoy Dukat",
                        "address": "Искусств 6, Харьков, Kharkiv Oblast, 61000",
                        "latitude": "50.000002",
                        "longitude": "36.244409",
                        "working_hours": "10:00 - 22:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipM5UHAV9SlNe1eW-nluYRB5uYgqj0PLTOTE67TK=w203-h114-k-no']
                    },
                    {
                        "id": "2",
                        "name": "Львівська Майстерня Шоколаду",
                        "address": "ул. Квитки-Основьяненко, 12, Харьков",
                        "latitude": "49.989559",
                        "longitude": "36.231054",
                        "working_hours": "09:00 - 22:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipM5EFNIYa29LtiVeTrMOvRY_SpcUFGGaU_bfvuc=s277-k-no']
                    },
                    {
                        "id": "3",
                        "name": "Имбирный пряник",
                        "address": "ул. Сумская, 36/38, Харьков, Харьковская Область, 61000",
                        "latitude": "49.999889",
                        "longitude": "36.234664",
                        "working_hours": "08:00 - 23:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipMK17PkjnKAgkeswJ_b0dkJqlSiBBd3Z3r803yO=w408-h544-k-no']
                    },
                    {
                        "id": "4",
                        "name": "Кава Лайф",
                        "address": "ул. Сумская, 22, Харьков, Харьковская Область, 61000",
                        "latitude": "49.988908",
                        "longitude": "36.231657",
                        "working_hours": "08:00 - 22:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipMQB1ZTI3pJjareI7cO6xYCWiu5fMnYJHUdNOfe=w408-h306-k-no']
                    },
                    {
                        "id": "5",
                        "name": "Sweeter",
                        "address": "ул. Сумская, 26, Харьков, Харьковская Область, 61000",
                        "latitude": "49.997514",
                        "longitude": "36.233612",
                        "working_hours": "07:30 - 21:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipNzdfylSC0aGpWgHQo2wMLRpU4zZZQL6nzEbW3n=w408-h301-k-no']
                    },
                    {
                        "id": "6",
                        "name": "Віденська кав'ярня",
                        "address": "ул. Чернышевского, 15, Харьков, Харьковская Область, 61000",
                        "latitude": "49.997397",
                        "longitude": "36.230657",
                        "working_hours": "09:30 - 22:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipPUlkbyAWKmI4YfBx4Oz95pfGKqEFbZ1s1wWQNt=w408-h200-k-no-pi-2.9338646-ya91.50001-ro-0-fo100']
                    },
                    {
                        "id": "7",
                        "name": "ДОЛЬЧЕ, КОФЕЙНЯ-РЕСТОРАН",
                        "address": "ул. Гуданова, 4/10",
                        "latitude": "50.002655",
                        "longitude": "36.248992",
                        "working_hours": "09:00 - 22:00",
                        "images": ['https://lh6.googleusercontent.com/proxy/ODZVwI9YYYJqgCNWoAWpGzMzRSt0O65nT_WiaiANa3_cg4aiLC9In3miJtHM3Rxt78tws9BLr1suON5QDeBiDJ4oj1yNc0GziDTEKZsQ1OGFzah3YlHsL_WGugx0juYgqsG2l1FntuLZ5-H63-ssuw0TAuVmAQ=w408-h271-k-no']
                    },
                    {
                        "id": "8",
                        "name": "FamilyCoffee",
                        "address": "ТЦ Квартал Харьков, Независимости проспект, 10",
                        "latitude": "50.006150",
                        "longitude": "36.234218",
                        "working_hours": "09:00 - 19:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipMrHztfWutM7CNU6qVfN0ROJ3cghZUQwe1MXdiF=w408-h272-k-no']
                    },
                    {
                        "id": "9",
                        "name": "Блэк & Милк",
                        "address": "ул. Ярослава Мудрого, 22, (перекресток Ярослава Мудрого и Алчевских, напротив Пончиковой",
                        "latitude": "50.005241",
                        "longitude": "36.243896",
                        "working_hours": "08:00 - 20:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipO_4JMByxxnlM3BHbFqICN0oUPF3x4no4kVh5Np=w408-h213-k-no']
                    },
                    {
                        "id": "10",
                        "name": "KOFEiN®",
                        "address": "вул. Римарська, 15",
                        "latitude": "49.996650",
                        "longitude": "36.230866",
                        "working_hours": "",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipOciPRXvJ99mXinAK66P-dkA-EJkFC7OEn_mjk=w408-h229-k-no']
                    },
                    {
                        "id": "11",
                        "name": "Коффішка",
                        "address": "ул. Пушкинская, 50/52",
                        "latitude": "49.999394",
                        "longitude": "36.242161",
                        "working_hours": "07:30 - 23:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipOkBH4J6xGPbpgyFRg4u9u2KoxJr99lvPAGUP0=w408-h306-k-no']
                    },
                    {
                        "id": "12",
                        "name": "Coffeelaktika кавова студія",
                        "address": "ул. Сумская, 25",
                        "latitude": "49.999371",
                        "longitude": "36.232999",
                        "working_hours": "10:00 - 21:00",
                        "images": ['https://lh5.googleusercontent.com/p/AF1QipMVLHx62P426ys2xeo1oi7PQ2k7khms98xJpulI=w408-h271-k-no']
                    }
                ];


                let userCoords = {
                    "latitude": "49.9935",
                    "longitude": "36.230383000000074",
                }
                test.forEach((item) => {
                    item['distance'] = this.getDistance(userCoords.latitude, userCoords.longitude, item.latitude, item.longitude); 
                })    

                test.sort(this.compareDistance);
                test.forEach((item) => {
                    let distanceArray: string[] = ('' + item['distance']).split('.');
                    if(distanceArray.length === 1) {
                        item['distanceString']  = distanceArray[0] + ' километрa';
                    } else {
                        if(distanceArray[0] === '0') {
                            item['distanceString']  = distanceArray[1] + ' метрa';
                        } else {
                            item['distanceString']  = distanceArray[0] + ' километрa ' + distanceArray[1] + ' метрa';
                        }
                    }
                });    

                console.log(test);

                this.placesService.loadData(test);
                //  this.placesService.loadData(res.khariv);
            }
        }, (err) => {
            console.log(err);
        });       
    }

    saveToStorage(arr: Array<any>) {
        this.localStorage.saveCafesToStorage(arr);
    }

    loadData() {
        let obj = {
            'startLat': 49.991899,
            'endLat': 49.987322,
            'startLng': 36.227468,
            'endLng': 36.236950
        }
        const request = this.placesService.getPlaces(obj);
        this.addRequestToStack(request);
    }
}
