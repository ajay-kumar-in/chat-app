import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('messageVar') messageVar: any;
  constructor(
    public webSocketService: WebSocketService,
  ) {}

  ngOnInit() {
    this.webSocketService.listen('message').subscribe((data) => {
      console.log('111111111111111111111111111', data);
      
    });
  }

  sendMsg() {
    this.webSocketService.emit('message', this.messageVar.nativeElement.value)
  }

  
}
