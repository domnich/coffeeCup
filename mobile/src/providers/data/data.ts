import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {BehaviorSubject, Observable} from "rxjs";


@Injectable()
export class DataProvider {
    private _cafesData = new BehaviorSubject({});
    rootUrl: string = 'https://jsonplaceholder.typicode.com';
    posts: string = 'posts';

    constructor(public http: Http) {
        console.log('Hello DataProvider Provider');
    }

    getPosts() {

        // let coords = [{
        //     latitude: 49.993500,
        //     longitude: 36.230383
        // }];


        // {
        //   id: null,
        //   name: null,
        //   address: {
        //     city: "Kharkiv",
        //     street: null,
        //     phone: null,
        //     cite: null,
        //     workingTime: {
        //       from: null,
        //       to: null
        //     },
        //     geolocation: {
        //       lat: null,
        //       lng: null
        //     }
        //   },
        //   photos: null
        // }

        let cafes = [
          {
            id: 1,
            name: "Zolotoy Dukat",
            address: {
              city: "Kharkiv",
              street: "Искусств 6",
              phone: "063 033 1604",
              cite: "facebook.com",
              workingTime: {
                from: "10",
                to: "10"
              },
              geolocation: {
                lat: 50.000002,
                lng: 36.244409
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipM5UHAV9SlNe1eW-nluYRB5uYgqj0PLTOTE67TK=w203-h114-k-no']
          },
          {
            id: 2,
            name: "Львівська Майстерня Шоколаду",
            address: {
              city: "Kharkiv",
              street: "Kvitky-Osnov'yanenka St, 12",
              phone: "050 363 2632",
              cite: "chocolate.lviv.ua",
              workingTime: {
                from: "9",
                to: "10"
              },
              geolocation: {
                lat: 49.989559,
                lng: 36.231054
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipM5EFNIYa29LtiVeTrMOvRY_SpcUFGGaU_bfvuc=s277-k-no', 'https://lh5.googleusercontent.com/p/AF1QipN8FIdm16QdXiVrSPELNBcaxOQCtW53morpI6h5=w203-h114-k-no']
          },
          {
            id: 3,
            name: "Имбирный пряник",
            address: {
              city: "Kharkiv",
              street: "Sumska St, 36/38",
              phone: "057 750 6080",
              cite: "gingerbread.cafe",
              workingTime: {
                from: "8",
                to: "11"
              },
              geolocation: {
                lat: 49.999889,
                lng: 36.234664
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipMK17PkjnKAgkeswJ_b0dkJqlSiBBd3Z3r803yO=w408-h544-k-no']
          },
          {
            id: 4,
            name: "Кава Лайф",
            address: {
              city: "Kharkiv",
              street: "Sumska St, 22",
              phone: "067 631 1904",
              cite: "coffeelife.com.ua",
              workingTime: {
                from: "8",
                to: "10"
              },
              geolocation: {
                lat: 49.988908,
                lng: 36.231657
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipMQB1ZTI3pJjareI7cO6xYCWiu5fMnYJHUdNOfe=w408-h306-k-no']
          },
          {
            id: 5,
            name: "Sweeter",
            address: {
              city: "Kharkiv",
              street: "Sumska St, 26",
              phone: "063 472 0168",
              cite: "sweeter.in.ua",
              workingTime: {
                from: "7:30",
                to: "9"
              },
              geolocation: {
                lat: 49.997514,
                lng: 36.233612
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipNzdfylSC0aGpWgHQo2wMLRpU4zZZQL6nzEbW3n=w408-h301-k-no']
          },
          {
            id: 6,
            name: "Віденська кав'ярня",
            address: {
              city: "Kharkiv",
              street: "Chernyshevska St, 15",
              phone: "057 706 2012",
              cite: "vk.com",
              workingTime: {
                from: "9",
                to: "10"
              },
              geolocation: {
                lat: 49.997397,
                lng: 36.230657
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipPUlkbyAWKmI4YfBx4Oz95pfGKqEFbZ1s1wWQNt=w408-h200-k-no-pi-2.9338646-ya91.50001-ro-0-fo100']
          },
          {
            id: 7,
            name: "ДОЛЬЧЕ, КОФЕЙНЯ-РЕСТОРАН",
            address: {
              city: "Kharkiv",
              street: "Hudanova St, 4-10",
              phone: "057 719 3214",
              cite: "dolce-cafe.com.ua",
              workingTime: {
                from: "9",
                to: "10"
              },
              geolocation: {
                lat: 50.002655,
                lng: 36.248992
              }
            },
            photos: ['https://lh6.googleusercontent.com/proxy/ODZVwI9YYYJqgCNWoAWpGzMzRSt0O65nT_WiaiANa3_cg4aiLC9In3miJtHM3Rxt78tws9BLr1suON5QDeBiDJ4oj1yNc0GziDTEKZsQ1OGFzah3YlHsL_WGugx0juYgqsG2l1FntuLZ5-H63-ssuw0TAuVmAQ=w408-h271-k-no']
          },
          {
            id: 8,
            name: "FamilyCoffee",
            address: {
              city: "Kharkiv",
              street: "Nezalezhnosti Avenue, 10",
              phone: "050 917 6321",
              cite: null,
              workingTime: {
                from: "9",
                to: "7"
              },
              geolocation: {
                lat: 50.006150,
                lng: 36.234218
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipMrHztfWutM7CNU6qVfN0ROJ3cghZUQwe1MXdiF=w408-h272-k-no']
          },
          {
            id: 9,
            name: "Блэк & Милк",
            address: {
              city: "Kharkiv",
              street: "ул. Ярослава Мудрого, 22",
              phone: "063 828 2928",
              cite: "instagram.com",
              workingTime: {
                from: "8",
                to: "8"
              },
              geolocation: {
                lat: 50.005241,
                lng: 36.243896
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipO_4JMByxxnlM3BHbFqICN0oUPF3x4no4kVh5Np=w408-h213-k-no']
          },
          {
            id: 10,
            name: "KOFEiN®",
            address: {
              city: "Kharkiv",
              street: "вул. Римарська, 15",
              phone: "057 759 4414",
              cite: "kofein.biz",
              workingTime: {
                from: null,
                to: null
              },
              geolocation: {
                lat: 49.996650,
                lng: 36.230866
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipOciPRXvJ99mXinAK66P-dkA-EJkFC7OEn_mjk=w408-h229-k-no']
          },
          {
            id: 11,
            name: "Коффішка",
            address: {
              city: "Kharkiv",
              street: "Pushkins'ka St, 50/52",
              phone: null,
              cite: "gastra.com.ua",
              workingTime: {
                from: "7:30",
                to: "11"
              },
              geolocation: {
                lat: 49.999394,
                lng: 36.242161
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipOkBH4J6xGPbpgyFRg4u9u2KoxJr99lvPAGUP0=w408-h306-k-no']
          },
          {
            id: 12,
            name: "Coffeelaktika кавова студія",
            address: {
              city: "Kharkiv",
              street: "Sumska St, 25",
              phone: "057 717 2525",
              cite: "coffeelaktika.com",
              workingTime: {
                from: "10",
                to: "9"
              },
              geolocation: {
                lat: 49.999371,
                lng: 36.232999
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipMVLHx62P426ys2xeo1oi7PQ2k7khms98xJpulI=w408-h271-k-no']
          },
          //////////////////////////////////////////////////
          {
            id: 1,
            name: "Zolotoy Dukat",
            address: {
              city: "Kharkiv",
              street: "Искусств 6",
              phone: "063 033 1604",
              cite: "facebook.com",
              workingTime: {
                from: "10",
                to: "10"
              },
              geolocation: {
                lat: 50.000002,
                lng: 36.244409
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipM5UHAV9SlNe1eW-nluYRB5uYgqj0PLTOTE67TK=w203-h114-k-no']
          },
          {
            id: 2,
            name: "Львівська Майстерня Шоколаду",
            address: {
              city: "Kharkiv",
              street: "Kvitky-Osnov'yanenka St, 12",
              phone: "050 363 2632",
              cite: "chocolate.lviv.ua",
              workingTime: {
                from: "9",
                to: "10"
              },
              geolocation: {
                lat: 49.989559,
                lng: 36.231054
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipM5EFNIYa29LtiVeTrMOvRY_SpcUFGGaU_bfvuc=s277-k-no', 'https://lh5.googleusercontent.com/p/AF1QipN8FIdm16QdXiVrSPELNBcaxOQCtW53morpI6h5=w203-h114-k-no']
          },
          {
            id: 3,
            name: "Имбирный пряник",
            address: {
              city: "Kharkiv",
              street: "Sumska St, 36/38",
              phone: "057 750 6080",
              cite: "gingerbread.cafe",
              workingTime: {
                from: "8",
                to: "11"
              },
              geolocation: {
                lat: 49.999889,
                lng: 36.234664
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipMK17PkjnKAgkeswJ_b0dkJqlSiBBd3Z3r803yO=w408-h544-k-no']
          },
          {
            id: 4,
            name: "Кава Лайф",
            address: {
              city: "Kharkiv",
              street: "Sumska St, 22",
              phone: "067 631 1904",
              cite: "coffeelife.com.ua",
              workingTime: {
                from: "8",
                to: "10"
              },
              geolocation: {
                lat: 49.988908,
                lng: 36.231657
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipMQB1ZTI3pJjareI7cO6xYCWiu5fMnYJHUdNOfe=w408-h306-k-no']
          },
          {
            id: 5,
            name: "Sweeter",
            address: {
              city: "Kharkiv",
              street: "Sumska St, 26",
              phone: "063 472 0168",
              cite: "sweeter.in.ua",
              workingTime: {
                from: "7:30",
                to: "9"
              },
              geolocation: {
                lat: 49.997514,
                lng: 36.233612
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipNzdfylSC0aGpWgHQo2wMLRpU4zZZQL6nzEbW3n=w408-h301-k-no']
          },
          {
            id: 6,
            name: "Віденська кав'ярня",
            address: {
              city: "Kharkiv",
              street: "Chernyshevska St, 15",
              phone: "057 706 2012",
              cite: "vk.com",
              workingTime: {
                from: "9",
                to: "10"
              },
              geolocation: {
                lat: 49.997397,
                lng: 36.230657
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipPUlkbyAWKmI4YfBx4Oz95pfGKqEFbZ1s1wWQNt=w408-h200-k-no-pi-2.9338646-ya91.50001-ro-0-fo100']
          },
          {
            id: 7,
            name: "ДОЛЬЧЕ, КОФЕЙНЯ-РЕСТОРАН",
            address: {
              city: "Kharkiv",
              street: "Hudanova St, 4-10",
              phone: "057 719 3214",
              cite: "dolce-cafe.com.ua",
              workingTime: {
                from: "9",
                to: "10"
              },
              geolocation: {
                lat: 50.002655,
                lng: 36.248992
              }
            },
            photos: ['https://lh6.googleusercontent.com/proxy/ODZVwI9YYYJqgCNWoAWpGzMzRSt0O65nT_WiaiANa3_cg4aiLC9In3miJtHM3Rxt78tws9BLr1suON5QDeBiDJ4oj1yNc0GziDTEKZsQ1OGFzah3YlHsL_WGugx0juYgqsG2l1FntuLZ5-H63-ssuw0TAuVmAQ=w408-h271-k-no']
          },
          {
            id: 8,
            name: "FamilyCoffee",
            address: {
              city: "Kharkiv",
              street: "Nezalezhnosti Avenue, 10",
              phone: "050 917 6321",
              cite: null,
              workingTime: {
                from: "9",
                to: "7"
              },
              geolocation: {
                lat: 50.006150,
                lng: 36.234218
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipMrHztfWutM7CNU6qVfN0ROJ3cghZUQwe1MXdiF=w408-h272-k-no']
          },
          {
            id: 9,
            name: "Блэк & Милк",
            address: {
              city: "Kharkiv",
              street: "ул. Ярослава Мудрого, 22",
              phone: "063 828 2928",
              cite: "instagram.com",
              workingTime: {
                from: "8",
                to: "8"
              },
              geolocation: {
                lat: 50.005241,
                lng: 36.243896
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipO_4JMByxxnlM3BHbFqICN0oUPF3x4no4kVh5Np=w408-h213-k-no']
          },
          {
            id: 10,
            name: "KOFEiN®",
            address: {
              city: "Kharkiv",
              street: "вул. Римарська, 15",
              phone: "057 759 4414",
              cite: "kofein.biz",
              workingTime: {
                from: null,
                to: null
              },
              geolocation: {
                lat: 49.996650,
                lng: 36.230866
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipOciPRXvJ99mXinAK66P-dkA-EJkFC7OEn_mjk=w408-h229-k-no']
          },
          {
            id: 11,
            name: "Коффішка",
            address: {
              city: "Kharkiv",
              street: "Pushkins'ka St, 50/52",
              phone: null,
              cite: "gastra.com.ua",
              workingTime: {
                from: "7:30",
                to: "11"
              },
              geolocation: {
                lat: 49.999394,
                lng: 36.242161
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipOkBH4J6xGPbpgyFRg4u9u2KoxJr99lvPAGUP0=w408-h306-k-no']
          },
          {
            id: 12,
            name: "Coffeelaktika кавова студія",
            address: {
              city: "Kharkiv",
              street: "Sumska St, 25",
              phone: "057 717 2525",
              cite: "coffeelaktika.com",
              workingTime: {
                from: "10",
                to: "9"
              },
              geolocation: {
                lat: 49.999371,
                lng: 36.232999
              }
            },
            photos: ['https://lh5.googleusercontent.com/p/AF1QipMVLHx62P426ys2xeo1oi7PQ2k7khms98xJpulI=w408-h271-k-no']
          }
        ];





        return this.http.get(`${this.rootUrl}/${this.posts}`)
            .map(res => cafes).take(1)
            .subscribe(res => this._cafesData.next(res));
    }

    getPostById(id: number) {
        return this.http.get(`${this.rootUrl}/${this.posts}/${id}`).map(res => res.json()).take(1);
    }

    public get cafesData(): Observable<any> {
        return this._cafesData.asObservable();
    }
}
