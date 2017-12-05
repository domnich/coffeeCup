import { Component, ElementRef, ViewChild } from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture';

@Component({
  selector: 'wheel-selector',
  templateUrl: 'wheel-selector.html'
})

export class WheelSelectorComponent {
  @ViewChild('wheel') wheel;
  @ViewChild('slideList') slideList;
  pressGesture: Gesture;
  startCounter: number;
  constructor() {
    console.log('Hello WheelSelectorComponent Component');


    this.startCounter = 0;

setTimeout(() => {
    console.log(this.wheel.nativeElement, 2);

    console.log(this.slideList)

    this.pressGesture = new Gesture(this.wheel.nativeElement);
            this.pressGesture.listen();


    this.pressGesture.on('pan', e => {

        console.log(e)
        if(e.direction === 2) {
            this.startCounter--;
        } else if(e.direction === 4) {
            this.startCounter++;
        }

        if(e.isFinal) {
         this.slideList.nativeElement.style.transform = 'translateX(0px)';
         this.slideList.nativeElement.style.transition = 'transform 300ms';
          this.startCounter = 0;
        } else {
            this.slideList.nativeElement.style.transform = 'translate('+ this.startCounter*6 +'px, 0)';
            this.slideList.nativeElement.style.transition = 'transform 0ms';
        }

        // if(e.isFirst) {
        //   console.log(this.startCounter , 'FIRST')
        // } else if(e.isFinal) {
        //     console.log(e.center.x , 'LAST')
        // } else {
        //     console.log(e.center.x, '=======')
        // }
    })

}, 2000);

  }



}
