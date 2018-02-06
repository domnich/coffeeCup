import { Component, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Platform, Searchbar} from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { Cafe } from '../../models/cafe.interface';
import { Keyboard } from '@ionic-native/keyboard';
import { DataService } from '../../providers/shared/shared.service';
import * as $ from 'jquery';
import { Cancellable } from '../../app/services/cancellable';
import { PlacesService } from '../../pages/places/shared/places.service';


@Component({
    selector: 'search-bar',
    templateUrl: 'search-bar.html'
})
export class SearchBarComponent extends Cancellable implements OnDestroy {
    @ViewChild('searchbar') searchbar: Searchbar;
    @Output() isSearchBarActive: EventEmitter<boolean> = new EventEmitter<boolean>();
    public isInFocus: boolean = false;
    public searchValue: string;
    public cafes: Observable<Array<Cafe>>;
    public filteredCafes: any = [];
    private preventSearchHide: boolean = false;
    private keyBoardHeight: number;
    constructor(private platform: Platform, private keyboard: Keyboard, private shareDate: DataService, private placesService: PlacesService) {
        super();
        console.log('Hello SearchBarComponent Component');
        this.attachEvents();
        this.loadData();
    }

    attachEvents() {
        this.keyboard.onKeyboardShow().subscribe((e) => {

            this.keyBoardHeight = e.keyboardHeight;
        });
        this.keyboard.onKeyboardHide().subscribe((e) => {
            if(this.preventSearchHide) {
                this.preventSearchHide = false;
            } else {
                this.hideSearchField(e);
            }
        });
    }

    loadData() {
        this.addSubscriptionToStack(this.placesService.placesData
            .subscribe(res => {
                if (res && res.length) {
                    let t1 = res.concat(res);
                    let t2 = t1.concat(res);
                    let t3 = t2.concat(t1);
                    this.cafes = t3;
                    console.log(this.cafes);
                }
            }));
    }

    onInput(event: any) {
        this.filteredCafes = this.searchValue.length === 0 ? [] : this.cafes.filter((item) => {
            return (item['name'].toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
        });
        this.shareDate.emitFilteredCafes({
            data: this.filteredCafes, 
            value: this.searchValue,
            height: this.platform.height() - ($('#place-header').outerHeight(true) + this.keyBoardHeight)
        });
    }

    hideSearchField(event) {
        this.isInFocus = false;
        this.searchbar.inputBlurred();
        this.isSearchBarActive.emit(false);
        this.searchbar.cancelSearchbar(event);
        this.keyboard.close();
    }

    showSearchField(event) {
        event.preventDefault();
        this.preventSearchHide = false;
        if(this.isInFocus) {   
            this.hideSearchField(event);
        } else {
            this.searchbar.setFocus();
            this.isInFocus = true;
        }
        this.isSearchBarActive.emit(this.isInFocus);
    }
    
    ionClear(event) {
        this.preventSearchHide = this.platform.is('ios') ? true : false;
    }

    ngOnDestroy() {
        this.cancelSubscriptions();
    }
}