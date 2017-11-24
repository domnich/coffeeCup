import {Component, ViewChild} from '@angular/core';
import {AppEmitterProvider} from "../../providers/app-emitter/app-emitter";
import {Platform, Searchbar} from "ionic-angular";

@Component({
    selector: 'search-bar',
    templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
    @ViewChild('searchbar') searchbar: Searchbar;
    isInFocus: boolean = false;
    constructor(private appEmitter: AppEmitterProvider, private platform: Platform) {
        console.log('Hello SearchBarComponent Component');
        let self = this;
        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        window.addEventListener('native.keyboardhide', keyboardHideHandler);
        function keyboardShowHandler(e) {
            if(self.platform.is('ios')) {
                document.getElementById("cafes-list").style.height = document.getElementById("cafes-list").clientHeight - e.keyboardHeight + "px";
            }
            self.isInFocus = true;
        }
        function keyboardHideHandler(e) {
            if(self.platform.is('ios')) {
                document.getElementById("cafes-list").style.height = "100%";
            }
            self.isInFocus = false;
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

    onCancel(event) {}
}
