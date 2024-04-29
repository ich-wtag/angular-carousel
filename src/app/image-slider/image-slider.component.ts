import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

const animationCarousel = [
  state('outright', style({ transform: 'translateX(100%)' })),
  state('outleft', style({ transform: 'translateX(-100%)' })),
  transition('void=>inleft', [style({ transform: 'translateX(0)' })]),
  transition('void=>outleft', [style({ transform: 'translateX(-100%)' })]),

  transition('*=>inright', [
    style({ transform: 'translateX(-100%)' }),
    animate('300ms ease-in', style({ transform: 'translateX(0)' })),
    animate('300ms 100ms ease-in', style({ opacity: 1 })),
  ]),
  transition('*=>inleft', [
    style({ transform: 'translateX(100%)' }),
    animate('300ms ease-in', style({ transform: 'translateX(0)' })),
  ]),
  transition('*=>outleft', [
    animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
  ]),
  transition('*=>outright', [
    animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
  ]),
];

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  animations: [trigger('slideInOut', animationCarousel)],
})
export class ImageSliderComponent implements OnInit {
  currentImageIndex: number = 0;
  slideControl!: string[];

  @Input() imageSource!: any[];

  goToNextSlide() {
    const lastIndex = this.imageSource.length - 1;
    const prevIndex = this.currentImageIndex;
    const newIndex = ++this.currentImageIndex;
    this.currentImageIndex = newIndex > lastIndex ? 0 : newIndex;

    this.onSlide(this.currentImageIndex, prevIndex, 'right');
  }

  goToPreviousSlide() {
    const lastIndex = this.imageSource.length - 1;
    const prevIndex = this.currentImageIndex;
    const newIndex = --this.currentImageIndex;
    this.currentImageIndex = newIndex < 0 ? lastIndex : newIndex;

    this.onSlide(this.currentImageIndex, prevIndex, 'left');
  }
  ngOnInit(): void {
    this.slideControl = this.imageSource.map((x: any, index: number) =>
      index ? 'outleft' : 'inleft'
    );
  }

  onSlide(current: number, prev: number, direction: string) {
    this.slideControl[current] = 'in' + direction;
    this.slideControl[prev] = 'out' + direction;
  }
}
