import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: any;

  constructor() {
    this.socket = io.connect('http://localhost:3000');
    console.log('this.socket', this.socket);
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data, ()=> {
      console.log('message delivered');
    });
  }

  disconnect() {
    this.socket.disconnect()
  }
}
