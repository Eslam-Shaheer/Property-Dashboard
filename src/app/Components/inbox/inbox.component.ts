import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/Services/hotel.service';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { CampgroundService } from 'src/app/Services/campground.service';
import { ApartmentService } from 'src/app/Services/apartment.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  constructor(
    private hotelService: HotelService,
    private shared: SharedService,
    private activatedRoute: ActivatedRoute,
    private apartmentService: ApartmentService,
    private campgroundService: CampgroundService
  ) {
    // this.shared.id.subscribe((id) => {
    //   this.propId = id;
    // });
  }

  allMessages: any[] = [];
  allReplys: any[] = [];
  replay: string = '';
  propId: any;
  prop: any;
  isLoading = false;
  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.propId = params.get('id');
      this.prop = params.get('prop');
    });

    switch (this.prop) {
      case 'hotel':
        this.hotelService
          .getAllMessagesByHotelId(this.propId)
          .subscribe((result) => {
            this.allMessages = result.data;
            console.log(this.allMessages);
            if (this.allMessages) {
              for (let i = 0; i < this.allMessages.length; i++) {
                this.allReplys[i] = this.allMessages[i].replay;
              }
            }
            this.isLoading = false;
          });
        break;
      case 'apartment':
        this.apartmentService
          .getAllMessagesByApartmentId(this.propId)
          .subscribe((result) => {
            this.allMessages = result.data;

            if (this.allMessages) {
              for (let i = 0; i < this.allMessages.length; i++) {
                this.allReplys[i] = this.allMessages[i].replay;
              }
            }
            this.isLoading = false;
          });
        break;
      case 'campground':
        this.campgroundService
          .getAllMessagesByCampGroundId(this.propId)
          .subscribe((result) => {
            this.allMessages = result.data;

            if (this.allMessages) {
              for (let i = 0; i < this.allMessages.length; i++) {
                this.allReplys[i] = this.allMessages[i].replay;
              }
            }
            this.isLoading = false;
          });
        break;
      default:
        return;
    }
  }
  leaveReply(id: any, replay: any, index: number) {
    if (replay.value != '') {
      this.allReplys[index].push(replay.value);
      switch (this.prop) {
        case 'hotel':
          this.hotelService
            .createReplay(this.propId, id, { replay: replay.value })
            .subscribe((res) => {});
          break;
        case 'apartment':
          this.apartmentService
            .createReplay(this.propId, id, { replay: replay.value })
            .subscribe((res) => {});
          break;
        case 'campground':
          this.campgroundService
            .createReplay(this.propId, id, { replay: replay.value })
            .subscribe((res) => {});
          break;
      }

      replay.value = '';
    }
  }
}
