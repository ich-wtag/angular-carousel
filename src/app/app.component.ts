import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-carousel';

  imageSource = [
    { url: '../../assets/images/1.jpg', title: 'iamge 1' },
    { url: '../../assets/images/2.jpg', title: 'iamge 3' },
    { url: '../../assets/images/3.jpg', title: 'iamge 3' },
    { url: '../../assets/images/4.jpg', title: 'iamge 4' },
    { url: '../../assets/images/5.jpg', title: 'iamge 5' },
  ];
}
