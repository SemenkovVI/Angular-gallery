import { Component, OnInit, ViewChildren} from '@angular/core';
import {ImageService} from '../../shared/image.servise';



@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styles: []
})
export class ImageListComponent implements OnInit {

  constructor(private service: ImageService) { }
  // @ts-ignore
  imageList: any[];
  // @ts-ignore
  rowIndexArray: any[];

  ngOnInit(): void {
    if (this.service.imageDetailList) {
      this.service.imageDetailList.snapshotChanges().subscribe(
        list => {
          this.imageList = list.map(item => item.payload.val());
          console.log(this.imageList, this.imageList.length + 1);
          this.rowIndexArray = Array.from(Array(Math.ceil((this.imageList.length + 1) / 3)).keys());
          console.log(this.rowIndexArray);
        }
      );
    }

  }
}
