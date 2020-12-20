import { Component, OnInit } from '@angular/core';
import {ImageService} from '../shared/image.servise';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styles: []
})
export class ImagesComponent implements OnInit {

  constructor(private service: ImageService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.service.getImageDetailList();
  }

}
