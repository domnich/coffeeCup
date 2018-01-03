import { Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {Platform, Searchbar} from "ionic-angular";
import { DataProvider } from '../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { Cafe } from '../../models/cafe.interface';
import { Keyboard } from '@ionic-native/keyboard';
import { DataService } from '../../providers/shared/shared.service';


@Component({
    selector: 'search-bar',
    templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
    @ViewChild('searchbar') searchbar: Searchbar;
    @Output() isSearchBarActive: EventEmitter<boolean> = new EventEmitter<boolean>();
    public isInFocus: boolean = false;
    public searchValue: string;
    public cafes: Observable<Array<Cafe>>;
    public filteredCafes: any = [];
    private preventSearchHide: boolean = false;
    constructor(private platform: Platform, private data: DataProvider, private keyboard: Keyboard, private shareDate: DataService) {
        console.log('Hello SearchBarComponent Component');
        this.keyboard.onKeyboardHide().subscribe((e) => {
            if(this.preventSearchHide) {
                this.preventSearchHide = false;
            } else {
                this.hideSearchField(e);
            }
        });
        this.data.cafesData
            .subscribe(response => {
                if (response && response.length) {
                   this.cafes = response;
                }
            });
    }

    onInput(event: any) {
        this.filteredCafes = this.searchValue.length === 0 ? [] : this.cafes.filter((item) => {
            return (item['name'].toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
        });
        this.shareDate.emitFilteredCafes({
            data: this.filteredCafes, 
            value: this.searchValue
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
}