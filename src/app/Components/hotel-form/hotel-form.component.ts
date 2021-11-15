import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Observable, Subscription } from 'rxjs';
import { HotelService } from 'src/app/Services/hotel.service';
import { UploadService } from 'src/app/Services/upload.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss'],
  viewProviders: [MatExpansionPanel],
})
export class HotelFormComponent implements OnInit {
  result: any;
  Hotel = this._formBuilder.group({
    hotelName: ['', Validators.required],
    starRating: ['', Validators.required],
    phone: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    streetAddress: ['', Validators.required],
    zipCode: ['', Validators.required],
    cancellation: [''],
    checkIn: [''],
    checkOut: [''],
    children: [''],
    pets: [''],
    paymentOption: [''],
    facilities: this._formBuilder.group({
      parking: ['', Validators.required],
      breakfast: ['', Validators.required],
      lunch: ['', Validators.required],
      dinner: ['', Validators.required],
      popularFacilities: ['', Validators.required],
    }),
    amenities: this._formBuilder.group({
      room: [''],
      food: [''],
      bathroom: [''],
      media: [''],
      services: [''],
      view: [''],
      accessibility: [''],
      entertainment: [''],
    }),
    rooms: this._formBuilder.array([this.addRooms()]),
  });

  @Input() requiredFileType!: string;
  hotelImages: any[] = [];
  fileName = '';
  uploadProgress!: number;
  uploadSub!: Subscription;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  uploadAvailable: boolean = true;
  previews: string[] = [];
  imageInfos?: Observable<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private upload: UploadService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {}
  click() {
    console.log(this.Hotel.value);
  }

  get rooms() {
    return this.Hotel.controls['rooms'] as FormArray;
  }
  addRooms() {
    return this._formBuilder.group({
      roomName: [''],
      type: [''],
      customName: [''],
      numOfRoomOfThisType: [''],
      roomSize: [''],
      price: [''],
      bedType: [''],
      bedsNumber: [''],
      guestsNumber: [''],
      facilities: [''],
      available: [true],
      smoking: [''],
    });
  }
  onSave() {
    this.result = this.rooms.getRawValue();
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
  }
  addRoom() {
    this.rooms.push(this.addRooms());
  }

  uploadImg(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    const formData = new FormData();

    formData.append('multiple_images', file);

    if (file) {
      this.upload.uploadImages(formData).subscribe(
        (event: any) => {
          this.progressInfos[idx].value = 100;
          const msg = 'Uploaded the file successfully: ' + file.name;
          this.message.push(msg);
          this.hotelImages.push(event.data[0]);
          this.Hotel.value.images = this.hotelImages;
          console.log(this.Hotel.value);
        },
        (err: any) => {
          console.log(err);
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.uploadImg(i, this.selectedFiles[i]);
      }
    }
  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
  addHotel() {
    this.hotelService.creatHotel(this.Hotel.value).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
