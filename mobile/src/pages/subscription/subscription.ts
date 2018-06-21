import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth } from '../../app/services/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

const FEE_PER_CUP: Array<any> = [{
  type: 0,
  pricePerCup: [20, 18, 16]
}, {
  type: 1,
  pricePerCup: [24, 22, 20]
}];

interface SizeInterface {
  id: string,
  name: string,
  type: string
}
const SIZES: Array<SizeInterface> = [{
  id: '10',
  name: 'Маленькмй',
  type: 'STANDART'
},{
  id: '11',
  name: 'Стандартный',
  type: 'BIG'
},{
  id: '12',
  name: 'Большой',
  type: 'LARGE'
}];

@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {
  items: Array<any>;
  public type: number = 0;
  public sizes = SIZES;
  public totalPrice: number;
  public pricePerCup: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private auth: Auth,
    private alertCtrl: AlertController) {
    // что бы была возможность налету хоть для каждого юзера ставить разные типы
    // this.items = [{
    //   id: '1',
    //   name: 'Эспрессо',
    //   type: 'ESPRESSO',
    //   permissions: [0, 1, 2]
    // },{
    //   id: '2',
    //   name: 'Американо',
    //   type: 'AMERICANO',
    //   permissions: [0, 1, 2]
    // },{
    //   id: '3',
    //   name: 'Капучино',
    //   type: 'CAPUCHINO',
    //   permissions: [0, 1, 2]
    // },{
    //   id: '4',
    //   name: 'Латте',
    //   type: 'LATTE',
    //   permissions: [0, 1, 2]
    // }, {
    //   id: '5',
    //   name: 'Флэт Уайт',
    //   type: 'FLAT_WHITE',
    //   permissions: [0, 1, 2]
    // },{
    //   id: '6',
    //   name: 'Какао',
    //   type: 'CACAO',
    //   permissions: [0, 1, 2]
    // }];

    this.items = [{
      ind: 0,
      name: '5',
      total: 5
    }, {
      ind: 1,
      name: '10',
      total: 10
    }, {
      ind: 2,
      name: '20',
      total: 20
    }]
  }

  getAllowedSizes() {
    let arr = [];
    SIZES.forEach((obj) => {
      arr.push(obj);
    });
    return arr;
  }

  ionViewDidLoad() {
      this.onItemSelectedCallback(1);
  }

  changeType(type: number) {
    this.type = type;
  }

  onItemSelectedCallback(ind: number) {
    let selectedItem = this.items[ind];

    this.pricePerCup = FEE_PER_CUP.filter(obj => obj.type === this.type)[0].pricePerCup[selectedItem.ind];
    this.totalPrice = this.pricePerCup * selectedItem.total;
  }

  buySubscription() {
    this.auth.isAuthenticated().then(res => {
      if (res) {
        // TODO: do something
      } else {
        this.showLoginAlert();
      }
    });
  }

  showLoginAlert() {
  

    let alert = this.alertCtrl.create({
      title: 'Пожалуйста, авторизуйтесь, используя ваш профиль в социальной сети',
      cssClass: 'login-alert',

      buttons: [
        {
          text: 'Отмена',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ВКонтакте',
          handler: data => {
            
          }
        },
        {
          text: 'Facebook',
          handler: data => {
            
          }
        },
        {
          text: 'Google',
          handler: data => {

          }
        }
      ]

    });

    alert.present();

  
  }

}
