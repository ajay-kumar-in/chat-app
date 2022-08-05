import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebSocketService } from './../../web-socket.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {

  joinRoomForm: FormGroup = new FormGroup({})
  constructor(
    public webSocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    this.joinRoomForm = new FormGroup({
      roomName: new FormControl(null),
      userName: new FormControl(null)
    })
  }

  onJoinRoom() {
    console.log('this.joinRoomForm', this.joinRoomForm.value);
    
  }

}
