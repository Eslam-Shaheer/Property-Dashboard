import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { ApartmentService } from 'src/app/Services/apartment.service';
import { UploadService } from 'src/app/Services/upload.service';

@Component({
  selector: 'app-apartment-form',
  templateUrl: './apartment-form.component.html',
  styleUrls: ['./apartment-form.component.scss'],
})
export class ApartmentFormComponent implements OnInit {
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
  imageInfos?: Observable<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private upload: UploadService,
    private apartmentService: ApartmentService
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
      Entertainment: ['', Validators.required],
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
          this.Apartment.value.images = this.apartmentImages;
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
    this.apartmentService.creatApartment(this.Apartment.value).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {}
}
