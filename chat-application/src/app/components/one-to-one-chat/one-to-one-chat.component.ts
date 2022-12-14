import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './../../auth/services/auth.service';
import { BrowserStorageService } from './../../shared/services/browser-storage.service';
import { WebSocketService } from './../../web-socket.service';

@Component({
  selector: 'app-one-to-one-chat',
  templateUrl: './one-to-one-chat.component.html',
  styleUrls: ['./one-to-one-chat.component.scss']
})
export class OneToOneChatComponent implements OnInit {

  @ViewChild('messageVar') messageVar: any;
  loggedInUser: any = null;
  chatUser: any = {};
  room: string = '';
  chatMessages: any[] = [];
  isParticipantSelected: boolean = false;
  users: any[] = [];
  typing: boolean = false;
  isParticipantTyping: boolean = false;
  time: any;
  messageData: any;
  @ViewChild('chat_messages_el') chat_messages_el: any;

  constructor(
    public webSocketService: WebSocketService,
    public browserStorageService: BrowserStorageService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!);
    this.webSocketService.listen('one-to-one-message').subscribe((data) => {
      this.chatMessages.push(data);
      setTimeout(() => {
        this.autoScroll();
      }, 0)
      console.log('111111111111111111111111111', data, this.chatMessages);
    });

    this.webSocketService.listen('typing').subscribe((data) => {
      console.log('typing be', data);
      this.isParticipantTyping = true;
    });

    this.webSocketService.listen('notTyping').subscribe((data) => {
      console.log('not typing be', data);
      this.isParticipantTyping = false;
    });

    this.getUsers();
  }

  autoScroll = () => {
    console.log('auto scroll fun');
    // New message element
    let newMessageEl = this.chat_messages_el.nativeElement;

    // Height of the new message
    const newMessageStyles = getComputedStyle(newMessageEl)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = newMessageEl.offsetHeight + newMessageMargin

    // Visible height
    const $messages = <HTMLDivElement>document.querySelector('#messages')
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
      $messages.scrollTop = $messages.scrollHeight
    }
    // console.log(
    //   'newMessageMargin', newMessageMargin,
    //   'newMessageHeight', newMessageHeight,
    //   'visibleHeight', visibleHeight,
    //   'containerHeight', containerHeight,
    //   '$messages.scrollTop', $messages.scrollTop
    // );

  }

  getUsers() {
    this.authService.getUsers().subscribe((res: any) => {
      if (res.data.length) {
        this.users = res.data.filter((user: any) => user.email !== this.loggedInUser.email);
      }
    })
  }

  selectChatUser(user: any) {
    this.chatUser = user;
    this.room = [this.loggedInUser.email, this.chatUser.email].sort().join('_')
    console.log('this.chatUser.email', this.chatUser.email, [this.loggedInUser.email, this.chatUser.email].sort().join('_'));
    this.webSocketService.emit('join-one-to-one-chat', this.room);
    this.isParticipantSelected = true;
  }

  onTyping() {
    this.messageData = {
      fromUser: this.loggedInUser.email,
      toUser: this.chatUser,
      message: this.messageVar.nativeElement.value,
      room: this.room
    }
    if (!this.typing) {
      this.typing = true;
      this.webSocketService.emit('typing', this.messageData);
      this.time = setTimeout(() => {
        this.typing = false;
        this.webSocketService.emit('notTyping', this.messageData)
      }, 1000)
    } else {
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.typing = false;
        this.webSocketService.emit('notTyping', this.messageData)
      }, 1000);
    }
  }

  sendMsg() {
    this.webSocketService.emit('one-to-one-message', this.messageData);
  }

}
