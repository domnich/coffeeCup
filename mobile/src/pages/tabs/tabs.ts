import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, Events, Tabs} from 'ionic-angular';
import {  CafeListTab, MapTab } from '../pages';
import {Observable} from "rxjs/Observable";
import { Post } from "../../models/post.interface";
import { DataProvider } from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage   {

    @ViewChild('myTabs') tabRef: Tabs;
    tab1Root: any = CafeListTab;
    tab2Root: any = MapTab;
    tab1Title = "Cafe List";
    tab2Title = "Map";

    posts: Observable<Array<Post>>;
text: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider, private event: Events) {

  }

  ionViewDidLoad() {
      this.tabRef.select(0);
   // console.log('ionViewDidLoad TabsPage');
   //   this.event.publish("cafesData", []);
     this.getPosts();
  }

    getPosts() {
     this.data.getPosts();
        // console.log(1)
        // this.data.getPosts().subscribe((response) => {
        //     console.log(2)
        //     this.posts = response;
        //     this.event.publish("cafesData", response);
        // });



    }

    goToTab(tabIndex: number) {
        this.tabRef.select(tabIndex);
    }

}
