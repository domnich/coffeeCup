import {Component} from '@angular/core';
import {AppEmitterProvider} from "../../providers/app-emitter/app-emitter";

@Component({
    selector: 'search-bar',
    templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
    constructor(private appEmitter: AppEmitterProvider) {
        console.log('Hello SearchBarComponent Component');
        let self = this;

    }



    //
    // focusInput(input) {
    //     input.setFocus();
    // }

}
