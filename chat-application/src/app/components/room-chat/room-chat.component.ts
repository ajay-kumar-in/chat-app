import { Component, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from '../../web-socket.service';

@Component({
  selector: 'app-room-chat',
  templateUrl: './room-chat.component.html',
  styleUrls: ['./room-chat.component.scss']
})
export class RoomChatComponent implements OnInit {

  // @ViewChild('messageVar') messageVar: any;
  
  constructor(
    public webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    // this.webSocketService.listen('message').subscribe((data) => {
    //   console.log('111111111111111111111111111', data);
      
    // });
  }

  // sendMsg() {
  //   this.webSocketService.emit('message', this.messageVar.nativeElement.value)
  // }

}
