import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';

const animationCarousel = [
  state('outright', style({ transform: `translateX(100%)` })),
  state('outleft', style({ transform: `translateX(-100%)` })),
  transition('void=>inleft', [style({ transform: `translateX(0)` })]),
  transition('void=>outleft', [style({ transform: `translateX(-100%)` })]),

  transition('*=>inright', [
    style({ transform: `translateX(-100%)` }),
    animate('260ms ease-in', style({ transform: `translateX(0)` })),
  ]),
  transition('*=>inleft', [
    style({ transform: `translateX(100%)` }),
    animate('260ms ease-in', style({ transform: `translateX(0)` })),
  ]),
  transition('*=>outleft', [
    animate('260ms ease-in', style({ transform: `translateX(-100%)` })),
  ]),
  transition('*=>outright', [
    animate('260ms ease-in', style({ transform: `translateX(100%)` })),
  ]),
];

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  animations: [
    trigger('slideInOut', animationCarousel),
    // trigger('slideInOut', [
    //   transition('void => *', [
    //     style({ opacity: 0 }),
    //     animate('500ms', style({ opacity: 1 })),
    //   ]),
    //   transition('* => void', [animate('500ms', style({ opacity: 0 }))]),
    // ]),
  ],
})
export class ImageSliderComponent implements OnInit, AfterContentInit {
  currentImageIndex: number = 0;
  slideControl!: any[];

  @Input() imageSource!: any[];

  // getDesiredImage() {
  //   return this.imageSource[this.currentImageIndex];
  // }

  // goToNextSlide() {
  //   const lastIndex = this.imageSource.length - 1;
  //   const newIndex = ++this.currentImageIndex;
  //   this.currentImageIndex = newIndex > lastIndex ? 0 : newIndex;

  //   this.getDesiredImage();
  // }

  // goToPreviousSlide() {
  //   const lastIndex = this.imageSource.length - 1;
  //   const newIndex = --this.currentImageIndex;
  //   this.currentImageIndex = newIndex < 0 ? lastIndex : newIndex;

  //   this.getDesiredImage();
  // }
  ngOnInit(): void {
    this.slideControl = this.imageSource.map((x: any, index: number) =>
      index ? 'outleft' : 'inleft'
    );
    console.log(this.slideControl);
  }

  ngAfterContentInit(): void {
    // this.slideControl = this.imageSource.map((x: any, index: number) =>
    //   index ? 'outleft' : 'inleft'
    // );
    // console.log('after', this.slideControl, this.imageSource);
  }

  change(direction: string) {
    const incr = direction == 'right' ? -1 : +1;
    const prev = this.currentImageIndex;
    this.currentImageIndex =
      (this.currentImageIndex + this.imageSource.length + incr) %
      this.imageSource.length;

    this.onSlide(this.currentImageIndex, prev, direction);
  }

  onSlide(current: any, prev: any, direction: any) {
    this.slideControl[current] = 'in' + direction;
    this.slideControl[prev] = 'out' + direction;

    console.log(this.slideControl);

    // this.posThumbail(current);
  }
}
