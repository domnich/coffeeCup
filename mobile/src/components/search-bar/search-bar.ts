import {ChangeDetectorRef, Component, ViewChild, Output, EventEmitter} from '@angular/core';
import {Platform, Searchbar} from "ionic-angular";
import { DataProvider } from '../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { Cafe } from '../../models/cafe.interface';
import { Keyboard } from '@ionic-native/keyboard';


@Component({
    selector: 'search-bar',
    templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
    @ViewChild('searchbar') searchbar: Searchbar;
    @Output() isSearchBarActive: EventEmitter<boolean> = new EventEmitter<boolean>();
    isInFocus: boolean = false;
    public title: string = "World";
    public searchValue: string;
    public cafes: Observable<Array<Cafe>>;
    public filteredCafes: Observable<Array<Cafe>>;
    constructor(private platform: Platform, private cd: ChangeDetectorRef, private data: DataProvider, private keyboard: Keyboard) {
        console.log('Hello SearchBarComponent Component');
        let self = this;

        // this.keyboard.onKeyboardShow().subscribe(() => {
        //     this.isInFocus = true;
        //     this.isSearchBarActive.emit(true);
        // });
        this.keyboard.onKeyboardHide().subscribe(() => {
            this.isInFocus = false;
            this.isSearchBarActive.emit(false);
        });

        // window.addEventListener('native.keyboardshow', keyboardShowHandler);
        // window.addEventListener('native.keyboardhide', keyboardHideHandler);


        
        // function keyboardShowHandler(e) {
        //     self.isInFocus = true;
        //     self.cd.detectChanges();
        //     // if(self.platform.is('ios')) {
        //     //     document.getElementById("cafes-list").style.height = document.getElementById("cafes-list").clientHeight - e.keyboardHeight + "px";
        //     // }
        //     // var x = document.getElementsByTagName("LI");
        // }
        // function keyboardHideHandler(e) {
        //     self.isInFocus = false;
        //     self.cd.detectChanges();
        //     // if(self.platform.is('ios')) {
        //     //     document.getElementById("cafes-list").style.height = "100%";
        //     // }
        // }

        this.data.cafesData
            .subscribe(response => {
                if (response && response.length) {
                   this.cafes = response;
                }
            });
    }

    onInput(event: any) {
        this.filteredCafes = this.cafes.filter((item) => {
            return (item['name'].toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
        })
        console.log(this.filteredCafes, 'this.filteredCafes');
    }

    showSearchField(event) {
        event.preventDefault();
        if(this.isInFocus) {
            this.searchbar.cancelSearchbar(event);
        } else {
            this.searchbar.setFocus();
        }
        this.isInFocus = !this.isInFocus;
        this.isSearchBarActive.emit(true);
        
    }

    onCancel(event) {
        this.isInFocus = false;
    }
}
