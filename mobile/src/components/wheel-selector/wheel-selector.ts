import { Component,  ViewChild, Input } from '@angular/core';
import {Gesture} from 'ionic-angular/gestures/gesture';
import * as $ from 'jquery';
@Component({
  selector: 'wheel-selector',
  templateUrl: 'wheel-selector.html'
})

export class WheelSelectorComponent {
  @ViewChild('wheel') wheel;
  @ViewChild('slideList') slideList;
  @Input() items: Array<any>;
  @Input() center: boolean = false;
  @Input()
  set ready(isReady: boolean) {
    if (isReady) this.someCallbackMethod();
  }
  pressGesture: Gesture;
  startCounter: number = 0;
  slideCounter: number = 0;

  activeIndex: number = 0;
  activeClass: string = 'active';
  animSpeed: number = 500;
  slider;
  mask;
  constructor() {
    console.log('Hello WheelSelectorComponent Component');
    console.log(this)
    //this.namess = ['Эспрессо', 'Американо', 'Латте', 'Какао', 'Чай'];
  }

  ngAfterViewInit() {
    this.activate();
    if(this.center) {
      this.slideToItem(1, true);
    }
  }

  someCallbackMethod() {
    alert(3);
  }

  activate() {
      let width = 0,
          self = this;

      this.slider = $(this.slideList.nativeElement);
      this.mask = $(this.wheel.nativeElement).find('.mask-line');

      this.slider.find('>li').each(function(ind) {
        if(ind === 0) {
          self.startCounter = - $(this).width() / 2;
          self.slideList.nativeElement.style.transform = 'translate('+ self.startCounter +'px, 0)';
        }
        width += $(this).outerWidth() + parseInt($(this).css('margin-right'));
      });
      width = +width.toFixed(0);
      this.slider.css({
        width: width + 100
      });


      this.addActiveClass();
      this.activateSlider();
  }

  activateSlider() {
        this.pressGesture = new Gesture(this.wheel.nativeElement);
                this.pressGesture.listen();

        this.pressGesture.on('pan', e => {
          console.log(e.center.x, 'EEEEE')
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
                let distanceNumber = this.startCounter + this.slideCounter * 3.5;
                this.slideList.nativeElement.style.transform = 'translate('+ distanceNumber +'px, 0)';
                this.slideList.nativeElement.style.transition = 'transform 0ms';
            }
        });
  }

  slideToItem(ind, fast?: boolean) {
    this.activeIndex = ind;
    this.addActiveClass();
    this.slideToActiveElement(ind, fast);
  }

  addActiveClass() {
    this.slider.find('li').removeClass(this.activeClass);
    this.slider.find('li').eq(this.activeIndex).addClass(this.activeClass);
  }

  slideToActiveElement(index: number, fast?: boolean) {
      let distance:number = 0;
      this.slider.find('>li').each(function(ind) {
        if(ind < index) {

          distance += $(this).outerWidth() + parseInt($(this).css('margin-right'));
        } else if(ind === index) {
            distance += $(this).width() / 2;
        }
      });
      distance = -1 * +distance.toFixed(0);
      this.slideList.nativeElement.style.transform = 'translateX('+ distance +'px)';
      if(fast) {
        this.slideList.nativeElement.style.transition = 'transform '+ 0 +'ms';
        this.animateMaks(index);
      } else {
        this.slideList.nativeElement.style.transition = 'transform '+ this.animSpeed +'ms';
        this.animateMaks(index);
      }
      this.startCounter = distance;
      this.slideCounter = 0;
  }

  animateMaks(index: number) {
    let w: number = this.slider.find('li').eq(index).find('.txt').width();
    this.mask.width(w);
  }

  getActiveIndex() {
    let indexChanged = false,
        activeIndex;

    this.slider.find('>li').each(function(ind) {
      if($(this).position().left + $(this).width() >= 0 && !indexChanged) {
          indexChanged = true;
          activeIndex = ind;
      }
    });
    activeIndex = typeof activeIndex === 'number' ? activeIndex : this.slider.find('>li').length - 1;
    return activeIndex;
  }
}
