import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[contentHeight]'
})
export class ContentHeightDirective {
  @Input()
  contentHeight: string;
  constructor(
    private el: ElementRef
  ) {
    this.setContentHeight();
  }

  setContentHeight() {
    setTimeout(() => {
      let child = this.el.nativeElement.children[1],
          height = child.clientHeight;
      child.style.height = height + 'px';
    });
  }
}
