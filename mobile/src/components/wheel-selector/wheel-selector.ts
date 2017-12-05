import { Component, ElementRef, ViewChild } from '@angular/core';
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
  startCounter: number = 0;
  slideCounter: number = 0;
  names:Array<string>;
  activeIndex: number = 0;
  activeClass: string = 'active';
  animSpeed: number = 500;
  constructor() {
    console.log('Hello WheelSelectorComponent Component');
    this.names = ['Эспрессо', 'Американо', 'Латте', 'Какао', 'Чай'];
  }

  ngAfterViewInit() {
      this.activate();
  }

  activate() {
      let width = 0,
          self = this;

      $(this.slideList.nativeElement).find('>li').each(function(ind) {
        if(ind === 0) {
          self.startCounter = - $(this).width() / 2;
          self.slideList.nativeElement.style.transform = 'translate('+ self.startCounter +'px, 0)';
        }
        width += $(this).outerWidth() + parseInt($(this).css('margin-right'));
      });
      width = +width.toFixed(0);
      $(this.slideList.nativeElement).css({
        width: width + 100
      });


      this.addActiveClass();
      this.activateSlider();
  }

  activateSlider() {
        this.pressGesture = new Gesture(this.wheel.nativeElement);
                this.pressGesture.listen();

        this.pressGesture.on('pan', e => {
            if(e.direction === 2) {
                this.slideCounter--;
            } else if(e.direction === 4) {
                this.slideCounter++;
            }

            this.activeIndex = this.getActiveIndex();
            this.addActiveClass();

            if(e.isFinal) {
                this.slideToActiveElement(this.getActiveIndex());
            } else {
                let distanceNumber = this.startCounter + this.slideCounter * 4;
                this.slideList.nativeElement.style.transform = 'translate('+ distanceNumber +'px, 0)';
                this.slideList.nativeElement.style.transition = 'transform 0ms';
            }
        });
  }

  slideToItem(ind) {
    this.activeIndex = ind;
    this.addActiveClass();
    this.slideToActiveElement(ind);
  }

  addActiveClass() {
    $(this.slideList.nativeElement).find('li').removeClass(this.activeClass);
    $(this.slideList.nativeElement).find('li').eq(this.activeIndex).addClass(this.activeClass);
  }

  slideToActiveElement(index: number) {
      let distance = 0;
      $(this.slideList.nativeElement).find('>li').each(function(ind) {
        if(ind < index) {
          distance += $(this).outerWidth() + parseInt($(this).css('margin-right'));
        } else if(ind === index) {
            distance += $(this).width() / 2;
        }
      });
      distance = distance.toFixed(0) * -1;
      this.slideList.nativeElement.style.transform = 'translateX('+ distance +'px)';
      this.slideList.nativeElement.style.transition = 'transform '+ this.animSpeed +'ms';
      this.startCounter = distance;
      this.slideCounter = 0;
  }

  getActiveIndex() {
    let indexChanged = false,
        activeIndex;

    $(this.slideList.nativeElement).find('>li').each(function(ind) {
      if($(this).position().left + $(this).width() >= 0 && !indexChanged) {
          indexChanged = true;
          activeIndex = ind;
      }
    });
    activeIndex = typeof activeIndex === 'number' ? activeIndex : $(this.slideList.nativeElement).find('>li').length - 1;
    return activeIndex;
  }
}
