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
private searchValue: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private data: DataProvider, private event: Events) {

  }

  ionViewDidLoad() {
      this.tabRef.select(0);
     this.getPosts();
  }

    getPosts() {

        // console.log(1)
        this.data.getPosts();

        this.data.Settings
            .subscribe(response => {
                if(response && response.length) {
                    this.posts = response;
                }
            });


    }

    onInput(event: any) {
        this.posts = this.posts.filter((item) => {
            return (item['title'].toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
        })
    }

    goToTab(tabIndex: number) {
        this.tabRef.select(tabIndex);
    }

}
