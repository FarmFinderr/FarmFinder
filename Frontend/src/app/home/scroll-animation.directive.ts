import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[data-scroll]',
})
export class ScrollAnimationDirective {
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      this.el.nativeElement.classList.remove('invisible');
    } else {
      this.el.nativeElement.classList.add('invisible');
    }
  }
}
