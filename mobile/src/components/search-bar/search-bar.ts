import {Component, ViewChild} from '@angular/core';
import {AppEmitterProvider} from "../../providers/app-emitter/app-emitter";
import {Searchbar} from "ionic-angular";

@Component({
    selector: 'search-bar',
    templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
    @ViewChild('searchbar') searchbar: Searchbar;
    isInFocus: boolean = false;
    constructor(private appEmitter: AppEmitterProvider) {
        console.log('Hello SearchBarComponent Component');

        window.addEventListener('native.keyboardshow', keyboardShowHandler);
        window.addEventListener('native.keyboardhide', keyboardHideHandler);
        function keyboardShowHandler(e) {
            document.getElementById("cafes-list").style.height = document.getElementById("cafes-list").clientHeight - e.keyboardHeight + "px";
        }

        function keyboardHideHandler(e) {
            document.getElementById("cafes-list").style.height = "100%";
        }

    }

    showSearchField(event) {
        if(this.isInFocus) {
            console.log(event)
            this.searchbar.cancelSearchbar(event);
        } else {
            this.searchbar.setFocus();
        }
        this.isInFocus = !this.isInFocus;
    }

    onCancel(event) {}


    //
    // focusInput(input) {
    //     input.setFocus();
    // }

}
