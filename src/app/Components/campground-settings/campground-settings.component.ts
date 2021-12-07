import { CampgroundService } from './../../Services/campground.service';
import { Component, Input, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UploadService } from 'src/app/Services/upload.service';

@Component({
  selector: 'app-campground-settings',
  templateUrl: './campground-settings.component.html',
  styleUrls: ['./campground-settings.component.scss'],
})
export class CampgroundSettingsComponent implements OnInit {
  uploadSub: any;
  uploadProgress!: number;
  progressInfos: any;
  message: string[] = [];
  campgroundImages: any[] = [];
  selectedFiles: any;
  previews!: any[];
  imageInfos: any[] = [];
  images: any;
  constructor(
    private _formBuilder: FormBuilder,
    private upload: UploadService,
    private campgroundService: CampgroundService,
    private router: Router
  ) {}

  Campground = this._formBuilder.group({
    campgroundName: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    phone: ['', Validators.required],
    streetAddress: ['', Validators.required],
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
    cancellation: [''],
    checkIn: [''],
    checkOut: [''],
    children: [''],
    pets: [''],
    paymentOption: [''],
    rooms: this._formBuilder.array([this.addRooms()]),
  });

  get rooms() {
    return this.Campground.controls['rooms'] as FormArray;
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
      available: [true],
      smoking: [''],
      bookings: [],
    });
  }

  addRoom() {
    this.rooms.push(this.addRooms());
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
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
          this.campgroundImages.push(event.data[0]);
          this.imageInfos.push(event.data[0]);
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

  addCampground() {
    this.Campground.value.images = this.imageInfos;
    this.campgroundService
      .updateCampGround('61a40c1b5f8735070e2b5d9b', this.Campground.value)
      .subscribe(
        (result) => {
          console.log(result);
          if (result.success == true) this.router.navigate(['/complete/']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  property: any;
  isLoading = false;
  ngOnInit(): void {
    this.campgroundService
      .getCampGroundById('61a40c1b5f8735070e2b5d9b')
      .subscribe((result) => {
        console.log(result);
        this.property = result.data;
        this.Campground.patchValue(this.property);
        for (let i = 1; i < this.property.rooms.length; i++) {
          this.rooms.push(this.addRoomsFromApi(this.property.rooms[i]));
        }
        this.imageInfos = this.property.images;
        this.isLoading = false;
      });
  }
  deleteImage(index: number) {
    for (let i = 0; i < this.imageInfos.length; i++) {
      if (index == i) {
        this.imageInfos.splice(i, 1);
      }
    }
  }
  addRoomsFromApi(room: any) {
    return this._formBuilder.group({
      roomName: [room.roomName],
      type: [room.type],
      customName: [room.customName],
      numOfRoomOfThisType: [room.numOfRoomOfThisType],
      roomSize: [room.roomSize],
      price: [room.price],
      bedType: [room.bedType],
      bedsNumber: [room.bedsNumber],
      guestsNumber: [room.guestsNumber],
      available: [true],
      smoking: [room.smoking],
      bookings: [room.bookings || []],
    });
  }
}
