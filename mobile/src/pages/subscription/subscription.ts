import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public sizes = SIZES;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // что бы была возможность налету хоть для каждого юзера ставить разные типы
    this.items = [{
      id: '1',
      name: 'Эспрессо',
      type: 'ESPRESSO',
      permissions: [0, 1, 2]
    },{
      id: '2',
      name: 'Американо',
      type: 'AMERICANO',
      permissions: [0, 1, 2]
    },{
      id: '3',
      name: 'Капучино',
      type: 'CAPUCHINO',
      permissions: [0, 1, 2]
    },{
      id: '4',
      name: 'Латте',
      type: 'LATTE',
      permissions: [0, 1, 2]
    }, {
      id: '5',
      name: 'Флэт Уайт',
      type: 'FLAT_WHITE',
      permissions: [0, 1, 2]
    },{
      id: '6',
      name: 'Какао',
      type: 'CACAO',
      permissions: [0, 1, 2]
    }];
  }

  getAllowedSizes() {
    let arr = [];
    SIZES.forEach((obj) => {
      arr.push(obj);
    });
    return arr;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPage');
   // this.names = ['Эспрессо', 'Американо', 'Латте', 'Какао', 'Чай'];
   
  }

}
