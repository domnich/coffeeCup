import {Component} from '@angular/core';

@Component({
    selector: 'city-select',
    templateUrl: 'city-select.html'
})
export class CitySelectComponent {

    text: string;
    selectOptions: any;

    constructor() {
        console.log('Hello CitySelectComponent Component');
        this.text = 'Hello World';

        this.selectOptions = {
            title: 'Pizza Toppings',
            subTitle: 'Select your toppings',
            mode: 'md'
        };
    }


}
