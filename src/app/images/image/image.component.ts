import {Component, OnChanges, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ControlContainer} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {ImageService} from '../../shared/image.servise';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnChanges, OnInit {
  // @ts-ignore
  imgSrc: string;
  selectedImage: any;
  // @ts-ignore
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  });

  constructor(private storage: AngularFireStorage, private service: ImageService) {
  }

  ngOnInit(): void {
    this.imgSrc = '/assets/img/image_placeholder.jpg';
  }

  ngOnChanges(): void {
    this.resetForm();
  }

  showPreview(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(formValue: { [x: string]: any; category: any; }): void {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      const filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue.imageUrl = url;
            this.service.insertImageDetails(formValue);
            this.resetForm();
          });
        })
      ).subscribe();
    }
  }

  // tslint:disable-next-line:typedef
  get formControls() {
    return this.formTemplate.controls;
  }

  resetForm(): void {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      imageUrl: ''
    });
    this.imgSrc = '/assets/img/image_placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

}
