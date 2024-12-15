import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from './scroll-animation.directive'; 

@NgModule({
  declarations: [ScrollAnimationDirective], 
  imports: [CommonModule], 
  exports: [ScrollAnimationDirective],
})
export class SharedModule {}
