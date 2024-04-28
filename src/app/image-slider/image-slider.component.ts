import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [animate('500ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ImageSliderComponent {
  currentImageIndex: number = 0;

  imageSource = [
    { url: '../../assets/images/1.jpg', title: 'iamge 1' },
    { url: '../../assets/images/2.jpg', title: 'iamge 3' },
    { url: '../../assets/images/3.jpg', title: 'iamge 3' },
    { url: '../../assets/images/4.jpg', title: 'iamge 4' },
    { url: '../../assets/images/5.jpg', title: 'iamge 5' },
  ];

  getDesiredImage() {
    return this.imageSource[this.currentImageIndex];
  }

  goToNextSlide() {
    const lastIndex = this.imageSource.length - 1;
    const newIndex = ++this.currentImageIndex;
    this.currentImageIndex = newIndex > lastIndex ? 0 : newIndex;

    this.getDesiredImage();
  }

  goToPreviousSlide() {
    const lastIndex = this.imageSource.length - 1;
    const newIndex = --this.currentImageIndex;
    this.currentImageIndex = newIndex < 0 ? lastIndex : newIndex;

    this.getDesiredImage();
  }
}
