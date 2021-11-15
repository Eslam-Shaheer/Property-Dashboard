import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/Services/hotel.service';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/Services/shared.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit {
  constructor(
    private hotelService: HotelService,
    private shared: SharedService
  ) {
    this.shared.id.subscribe((id) => {
      this.propId = id;
    });
  }
  allMessages: any[] = [];
  allReplys: any[] = [];
  replay: string = '';
  propId: any;
  ngOnInit(): void {
    this.hotelService
      .getAllMessagesByHotelId(this.propId)
      .subscribe((result) => {
        this.allMessages = result.data;
        for (let i = 0; i < this.allMessages.length; i++) {
          this.allReplys[i] = this.allMessages[i].replay;
        }
        console.log(this.allReplys);
      });
  }
  leaveReply(id: any, replay: any, index: number) {
    if (replay.value != '') {
      this.allReplys[index].push(replay.value);
      this.hotelService
        .createReplay(this.propId, id, { replay: replay.value })
        .subscribe((res) => {});
      replay.value = '';
    }
  }
}
