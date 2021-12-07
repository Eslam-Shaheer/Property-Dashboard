import { ApartmentService } from './../../Services/apartment.service';
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
  selector: 'app-apartment-setting',
  templateUrl: './apartment-setting.component.html',
  styleUrls: ['./apartment-setting.component.scss'],
})
export class ApartmentSettingComponent implements OnInit {
  result: any;
  uploadSub: any;
  uploadProgress: any;
  message: any[] = [];
  progressInfos: any[] = [];
  selectedFiles: any;
  previews: any[] = [];
  apartmentImages: any[] = [];
  panelOpenState = false;
  panelOpenState2 = false;
  imageInfos: any[] = [];
  isLoading = false;
  constructor(
    private _formBuilder: FormBuilder,
    private upload: UploadService,
    private apartmentService: ApartmentService,
    private router: Router
  ) {}
  Apartment = this._formBuilder.group({
    apartmentName: ['', Validators.required],
    phone: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    streetAddress: ['', Validators.required],
    homeNumber: ['', Validators.required],
    apartmentNumber: ['', Validators.required],
    paymentOption: ['', Validators.required],
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
    cancellation: ['', Validators.required],
    price: ['', Validators.required],
    pets: [''],
    children: [''],
    events: [''],
    smoking: [''],
    facilities: this._formBuilder.group({
      general: ['', Validators.required],
      cookingAndCleaening: ['', Validators.required],
      entertainment: ['', Validators.required],
      view: ['', Validators.required],
    }),

    size: [''],
    guestsNum: [''],
    bathRooms: [''],
    bedRooms: this._formBuilder.array([this.addBedRooms()]),
    livingRooms: this._formBuilder.array([this.addLivingRooms()]),
  });
  addBedRooms() {
    return this._formBuilder.group({
      twinBed: [''],
      fullBed: [''],
      queenBed: [''],
      kingBed: [''],
      bunkBed: [''],
      sofaBed: [''],
      futonBed: [''],
    });
  }
  property: any;
  ngOnInit(): void {
    this.isLoading = true;
    this.apartmentService
      .getApartmentbyId('61a3dd74bd981c8dd3ab0d8d')
      .subscribe((apartment) => {
        this.property = apartment.data;
        this.Apartment.patchValue(this.property);

        for (let i = 1; i < this.property.bedRooms.length; i++) {
          this.bedRooms.push(
            this.addBedRoomsFromApi(this.property.bedRooms[i])
          );
        }
        for (let i = 1; i < this.property.livingRooms.length; i++) {
          this.livingRooms.push(
            this.addLivingRoomsFromApi(this.property.livingRooms[i])
          );
        }
        this.Apartment.patchValue({ facilities: this.property.facilities });
        console.log(this.property);
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
  addBedRoomsFromApi(room: any) {
    return this._formBuilder.group({
      twinBed: [room.twinBed],
      fullBed: [room.fullBed],
      queenBed: [room.queenBed],
      kingBed: [room.kingBed],
      bunkBed: [room.bunkBed],
      sofaBed: [room.sofaBed],
      futonBed: [room.futonBed],
    });
  }
  addLivingRoomsFromApi(room: any) {
    return this._formBuilder.group({
      sofaBed: [room.sofaBed],
    });
  }

  addLivingRooms() {
    return this._formBuilder.group({
      sofaBed: [''],
    });
  }
  get bedRooms() {
    return this.Apartment.controls['bedRooms'] as FormArray;
  }
  get livingRooms() {
    return this.Apartment.controls['livingRooms'] as FormArray;
  }

  onSave() {
    this.result = this.bedRooms.getRawValue();
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
  }
  addBedRoom() {
    this.bedRooms.push(this.addBedRooms());
  }
  addLivingRoom() {
    this.livingRooms.push(this.addLivingRooms());
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
          this.apartmentImages.push(event.data[0]);
          this.imageInfos.push(event.data[0]);
          console.log(this.Apartment.value);
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
  addApartment() {
    this.isLoading = true;
    this.Apartment.value.images = this.imageInfos;

    this.apartmentService
      .updateApartment('61a3dd74bd981c8dd3ab0d8d', this.Apartment.value)
      .subscribe(
        (result) => {
          console.log(result);
          if (result.success == true) this.router.navigate(['/complete/']);
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
  }
}
