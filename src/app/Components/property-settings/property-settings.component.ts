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
import { HotelService } from 'src/app/Services/hotel.service';

@Component({
  selector: 'app-property-settings',
  templateUrl: './property-settings.component.html',
  styleUrls: ['./property-settings.component.scss'],
})
export class PropertySettingsComponent implements OnInit {
  result: any;

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
  imageInfos: any[] = [];
  isLoading = false;
  constructor(
    private _formBuilder: FormBuilder,
    private upload: UploadService,
    private hotelService: HotelService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  property!: any;
  Hotel = this._formBuilder.group({
    hotelName: [''],
    starRating: [''],
    phone: [''],
    country: [''],
    description: [''],
    city: [''],
    streetAddress: [''],
    zipCode: [''],
    cancellation: [''],
    checkIn: [''],
    checkOut: [''],
    children: [''],
    pets: [''],
    paymentOption: [''],
    facilities: this._formBuilder.group({
      parking: [''],
      breakfast: [''],
      lunch: [''],
      dinner: [''],
      popularFacilities: [''],
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
  propId: any;
  prop: any;
  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.propId = params.get('id');
    });
    this.hotelService.getHotelById(this.propId).subscribe((result) => {
      this.property = result.data;
      this.Hotel.patchValue(this.property);

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
  get rooms() {
    return this.Hotel.controls['rooms'] as FormArray;
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
      facilities: [room.facilities],
      available: [true],
      smoking: [room.smoking],
      bookings: [room.bookings],
    });
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
      bookings: [''],
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
          this.imageInfos?.push(event.data[0]);
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
    this.isLoading = true;
    this.Hotel.value.images = this.imageInfos;
    console.log(this.Hotel.value);
    this.hotelService.updateHotel(this.propId, this.Hotel.value).subscribe(
      (result) => {
        this.isLoading = false;
        if (result.success == true) this.router.navigate(['/complete/']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
