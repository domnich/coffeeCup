import { Component, ElementRef, ViewChild, ngAfterViewInit } from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture';
import * as $ from 'jquery';
@Component({
  selector: 'wheel-selector',
  templateUrl: 'wheel-selector.html'
})

export class WheelSelectorComponent {
  @ViewChild('wheel') wheel;
  @ViewChild('slideList') slideList;
  pressGesture: Gesture;
  startCounter: number;
  names:Array<string>;
  list: ElementRef;
  constructor() {
    console.log('Hello WheelSelectorComponent Component');


this.names = ['Эспрессо', 'Американо', 'Латте', 'Какао', 'Чай']

    this.startCounter = 0;

  }

  ngAfterViewInit() {
      this.setSliderWidth();
  }

  setSliderWidth() {
      let width = 0,
      this.list = $(this.wheel.nativeElement).find('.common-list');
      this.list.find('>li').each(function() {
        width += $(this).outerWidth() + parseInt($(this).css('margin-right'));
      });
      width = +width.toFixed(0);
      this.list.css({
        width: width
      });




      this.activateSlider();
  }

  activateSlider() {



        this.pressGesture = new Gesture(this.wheel.nativeElement);
                this.pressGesture.listen();


        this.pressGesture.on('pan', e => {

            if(e.direction === 2) {
                this.startCounter--;
            } else if(e.direction === 4) {
                this.startCounter++;
            }

            if(e.isFinal) {
                this.findActiveItem();
          //   this.slideList.nativeElement.style.transform = 'translateX(0px)';
            // this.slideList.nativeElement.style.transition = 'transform 500ms';
          //    this.startCounter = 0;

            } else {
                this.slideList.nativeElement.style.transform = 'translate('+ this.startCounter*5 +'px, 0)';
                this.slideList.nativeElement.style.transition = 'transform 0ms';
            }
        });

  }

  findActiveItem() {
    this.list.find('>li').each(function() {
      console.log($(this).position().left)
    });
  }



}
