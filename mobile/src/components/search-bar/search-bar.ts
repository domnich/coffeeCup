import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Platform, Searchbar} from "ionic-angular";

@Component({
    selector: 'search-bar',
    templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
    @ViewChild('searchbar') searchbar: Searchbar;
    isInFocus: boolean = false;
    public title: string = "World";
    constructor(private platform: Platform, private cd: ChangeDetectorRef) {
        console.log('Hello SearchBarComponent Component');
        let self = this;
        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        window.addEventListener('native.keyboardhide', keyboardHideHandler);

        function keyboardShowHandler(e) {
            self.isInFocus = true;
            self.cd.detectChanges();
            // if(self.platform.is('ios')) {
            //     document.getElementById("cafes-list").style.height = document.getElementById("cafes-list").clientHeight - e.keyboardHeight + "px";
            // }
           // document.getElementById("map").style.height = "568px";

        }
        function keyboardHideHandler(e) {
            self.isInFocus = false;
            self.cd.detectChanges();
            // if(self.platform.is('ios')) {
            //     document.getElementById("cafes-list").style.height = "100%";
            // }


        }
    }

    showSearchField(event) {
        if(this.isInFocus) {
            this.searchbar.cancelSearchbar(event);
        } else {
            this.searchbar.setFocus();
        }
        this.isInFocus = !this.isInFocus;
    }

    onCancel(event) {
        this.isInFocus = false;
    }
}
